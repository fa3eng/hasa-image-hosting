import { observable, action } from "mobx";

class AuthStore {
    // 是否登录
    @observable isLogin = false;
    // 是否加载
    @observable isLoading = false;
    // 用户信息?
    @observable values = {
        username: '',
        password: ''
    }
    @action setIsLogin(isLogin){
        this.isLogin = isLogin;
    }
    @action setUsername(username){
        this.values.username = username;
    }
    @action setPassword(username){
        this.values.password = password;
    }
    @action login() {
        console.log('登陆中...')
        this.isLoading = true;
        setTimeout(() => {
            console.log('登录成功')
            this.isLogin = true;
            this.isLoading = false;
        }, 1000)
    }
    @action register() {
        console.log('注册中...')
        this.isLoading = true;
        setTimeout(() => {
            console.log('注册成功')
            this.isLogin = true;
            this.isLoading = false;
        }, 1000)
    }
    @action logout(){
        console.log('已经注销')
    }
}

export AuthStore;