import { observable, action } from 'mobx'
import { UpLoader } from '../models'
import { message } from 'antd'

class HistoryStore {
  @observable list = []
  @observable isLoading = false
  @observable hasMore = true
  @observable page = 0
  limit = 10

  @action append(newList) {
    this.list = this.list.concat(newList)
  }

  @action find() {
    this.isLoading = true
    UpLoader.find({ page: this.page, limit: 10 })
      .then(newList => {
        this.page += 1
        this.append(newList)
        if (newList.length < 10) {
          this.hasMore = false
        }
      })
      .catch(error => {
        message.error('加载失败')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  @action reset() {
    this.list = []
    this.isLoading = false
    this.hasMore = true
    this.page = 0
  }
}

export default new HistoryStore()