import React from 'react'
import LogoUrl from './logo.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

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


function Component() {
  return (<Header>
    <Logo src={LogoUrl} alt='logo' />
    <nav>
      <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
      <StyledLink to="/history">历史</StyledLink>
      <StyledLink to="/about">关于我</StyledLink>
    </nav>
  </Header>)
}

export default Component