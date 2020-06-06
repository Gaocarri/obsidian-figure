import { observable, action } from 'mobx'
import { Auth } from '../models'

class AuthStore {
  @observable values = {
    username: '',
    password: ''
  }


  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          console.log('登陆成功')
          resolve(user)
        })
        .catch(err => {
          console.log('登录失败')
          reject(err);
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(user => {
        console.log('注册成功')
        resolve(user)
      })
        .catch(err => {
          console.log('注册失败')
          reject(err);
        })
    })
  }

  @action logout() {
    Auth.logout()
  }
}

export { AuthStore }