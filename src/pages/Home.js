import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import Uploader from '../components/Uploader'
import Tips from '../components/Tips'

const Home = observer(() => {
  const { UserStore } = useStores()

  return (
    <>
      <Tips>请先登录在上传</ Tips>
      <Uploader />
    </>)
})

export default Home