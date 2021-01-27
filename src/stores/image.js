import { observable ,action, makeObservable } from 'mobx'
import { Uploader } from '../models'
import { message } from 'antd'

class ImageStore {

    constructor() {
        makeObservable(this);
    }
    
    @observable filename = '';
    @observable file = null;
    @observable isUploading = false;
    @observable serverFile = null;

    @action setFilename(newFilename) {
        this.filename = newFilename;
    };

    @action setFile(newFile) {
        this.file = newFile
    };

    @action upload(){
        this.isUploading = true;
        this.serverFile = null;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename)
            .then((serverFile) => {
                this.serverFile = serverFile;
                resolve(serverFile);
            })
            .catch((error) => {
                message.error('上传时发生错误');
                reject(error);
            })
            .finally(() => {
                this.isUploading = false;
            })
        })
    }

    @action reset(){
        this.filename = '';
        this.file = null;
        this.serverFile = null;
    }
}

export default new ImageStore()