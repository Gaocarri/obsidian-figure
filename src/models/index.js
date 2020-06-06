import AV, { Query, User } from 'leancloud-storage'

AV.init({
  appId: "Kwf0Ry4aNPf3FyHbVqeSnmnV-gzGzoHsz",
  appKey: "LzTSCvTLub83VH8wD83WHmk6",
  serverURL: "https://kwf0ry4a.lc-cn-n1-shared.com"
});

const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginUser => {
        resolve(loginUser)
      }, error => {
        reject(error)
      })
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => {
        // 登录成功
        resolve(loginedUser)
      }, error => {
        resolve(JSON.stringify(error));
      });
    })
  },
  logout() {
    User.logOut()
  },
  getCurrentUser() {
    return User.current()
  }
}



export {
  Auth
}