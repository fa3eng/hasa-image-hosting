import AV, { Query, User } from 'leancloud-storage'

AV.init({
    appId: "E3vYhzO0pDzgBhmIYQdfQfEm-gzGzoHsz",
    appKey: "YWD9Jpx17zt4zAYYOOIjRHQl",
    serverURL: "https://e3vyhzo0.lc-cn-n1-shared.com"
});


const Auth = {

    register(username, password) {
        let user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(User => resolve(User), error => reject(error))
        });
    },

    login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(User => resolve(User), error => reject(error))
        });
    },

    logout() {
        User.logOut();
    },

    getCurrentUser() {
        return User.current();
    }
}


const Uploader = {

    add(file, filename) {
        // 声明并且实例化一个对象, 这里的对象将会是image表(类)中的一条数据
        const item = new AV.Object('Image');
        // 声明并且实例化一个对象, 用这个对象来储存文件
        const avFile = new AV.File(filename, file);

        console.log(AV.User.current());

        // 给image表中的item这一项中的属性添加上他的值
        item.set('filename', filename)
        item.set('owner', AV.User.current());
        item.set('url', avFile);


        return new Promise((resolve, reject) => {
            item.save().then((serverFile) => {
                resolve(serverFile)
            }, (error) => {
                console.log('保存失败', error);
                reject(error);
            })
        })
    },

    // find(page = 0, limit = 10){
    //     const query = new Query('Image');
    //     query.include('owner');
    //     query.limit(limit);
    //     query.skip(page*limit);
    //     query.descending('createdAt');
    //     query.equalTo('owner', User.current());
    //     return new Promise((resolve, reject) => {
    //         query.find()
    //             .then(results => resolve(results))
    //             .catch(error => reject(error));
    //     })
    // }

    find({ page = 0, limit = 10 }) {
        const query = new AV.Query('Image');
        query.include('owner');
        query.limit(limit);
        query.skip(page * limit);
        query.descending('createdAt');
        query.equalTo('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => resolve(results))
                .catch(error => reject(error))
        });
    }
}

window.Uploader = Uploader;

export { Auth, Uploader };