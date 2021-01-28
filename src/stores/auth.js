import { observable, action, makeObservable } from "mobx";
import { message } from 'antd'
import UserStore from './user'
import HistoryStore from './history'
import ImageStore from './image'
import { Auth } from '../models'


class AuthStore {

    constructor() {
        makeObservable(this);
    }

    // 用户信息?
    @observable values = {
        username: '',
        password: ''
    }
    @action setUsername(username) {
        this.values.username = username;
    }
    @action setPassword(password) {
        this.values.password = password;
    }
    // 登录操作
    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    UserStore.pullUser();
                    resolve(user);
                }).catch(error => {
                    UserStore.resetUser();
                    message.error('账号或密码错误, 请尝试重新登录');
                    reject(error);
                })
        })
    }
    // 注册操作
    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password)
                .then(user => {
                    // UserStore.pullUser();
                    resolve(user);
                }).catch(error => {
                    UserStore.resetUser();
                    message.error('该用户名已存在, 注册失败');
                    reject(error);
                })
        })
    }
    // 注销操作
    @action logout() {
        Auth.logout();
        HistoryStore.reset();
        ImageStore.reset();
        UserStore.resetUser();
    }
}


export default new AuthStore();