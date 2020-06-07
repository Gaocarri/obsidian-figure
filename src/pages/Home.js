import React from 'react'
import { observer } from 'mobx-react'
import Uploader from '../components/Uploader'
import Tips from '../components/Tips'
import styled from 'styled-components'

const H1 = styled.h1`
  text-shadow: -5px 5px 0 rgba(0,0,0,.1);
`

const Home = observer(() => {
  return (
    <>
      <H1>Image UpLoad</H1>
      <Tips>请先登录再上传</ Tips>
      <Uploader />
    </>)
})

export default Home