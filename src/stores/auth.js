import { observable, action } from 'mobx'
import { Auth } from '../models'
import UserStore from './user'

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
          resolve(user)
        })
        .catch(err => {
          UserStore.resetUser()
          reject(err);
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(user => {
        UserStore.pullUser()
        resolve(user)
      })
        .catch(err => {
          UserStore.resetUser()
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