import React, { createContext, useContext } from 'react'
import AuthStore from './auth'
import UserStore from './user'
import ImageStore from './image'

const context = createContext({
  AuthStore,
  UserStore,
  ImageStore
});

// 记得删除
window.stores = {
  AuthStore,
  UserStore,
  ImageStore
}

export const useStores = () => useContext(context)