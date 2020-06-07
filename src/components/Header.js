import React, { useState } from 'react'
import LogoUrl from './logo.svg'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useStores } from '../stores'
import { observer } from 'mobx-react'

import { Button } from 'antd';

const Header = styled.header`
  display:flex;
  align-items:center;
  padding:10px 100px;
  background-color:#02101f;
  color:#fff;
`;
const Logo = styled.img`
  height:30px
`
const StyledLink = styled(NavLink)`
  color:#fff;
  margin-left:30px;

  &.active{
    border-bottom:1px solid #fff
  }
`

const Login = styled.div`
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  margin-left:10px;
`


const Component = observer(() => {

  const { UserStore, AuthStore, ImageStore, HistoryStore } = useStores()
  const history = useHistory()

  const handleLogout = () => {
    AuthStore.logout()
    ImageStore.reset()
    HistoryStore.reset()
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (<Header>
    <Logo src={LogoUrl} alt='logo' />
    <nav>
      <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
      <StyledLink to="/history">历史</StyledLink>
      <StyledLink to="/about">关于</StyledLink>
    </nav>
    <Login>
      {
        UserStore.currentUser ? <>
          <span>{UserStore.currentUser.attributes.username}</span>
          <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
        </> :
          <>
            <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
            <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
          </>
      }
    </Login>
  </Header>)
})

export default Component