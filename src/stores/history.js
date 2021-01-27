import { observable ,action, makeObservable } from 'mobx'
import {Uploader } from '../models'
import {message} from 'antd'

class HistoryStore {

    constructor() {
        makeObservable(this);
    }

    @observable list=[];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    limit = 10;

    @action append(newList){
        this.list = this.list.concat(newList);
    }

    @action find(){
        this.isLoading = true;
        Uploader.find({page: this.page, limit: this.limit})
            .then((newList) => {
                this.append(newList);
                this.page++;
                if(newList.length < this.limit){
                    this.hasMore = false;
                }
            })
            .catch((error) => {
                message.error('获取历史错误')
                console.log(error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action reset() {
        this.list=[];
        this.isLoading = false;
        this.hasMore = true;
        this.page = 0;
    }

}

export default new HistoryStore();
