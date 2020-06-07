import { observable, action } from 'mobx'
import { Auth } from '../models'
import UserStore from './user'
import { message } from 'antd'

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
          UserStore.pullUser()
          message.success('登录成功，跳转到首页')
          resolve(user)
        })
        .catch(err => {
          UserStore.resetUser()
          message.error('登陆失败，' + JSON.parse(err).rawMessage)
          reject(err);
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(user => {
        UserStore.pullUser()
        message.success('注册成功，跳转到首页')
        resolve(user)
      })
        .catch(err => {
          UserStore.resetUser()
          message.error('注册失败,' + err)
          reject(err);
        })
    })
  }

  @action logout() {
    Auth.logout()
    UserStore.resetUser()
  }
}

export default new AuthStore()