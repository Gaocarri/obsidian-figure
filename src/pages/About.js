import React from 'react'
import styled from 'styled-components'
import avatar from './avatar.jpg'

const A = styled.a`
  color:blue
`

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  margin:50px 10vw;
`
const Article = styled.article`
  text-align:center;
  margin-bottom:40px;
`
const P = styled.p`
  text-align:left;  
  font-size:16px;
`


const Div = styled.div`
  display:flex;
  flex-wrap:wrap;
  align-items:center;
`
const Img = styled.img`
  width:150px;
  height:150px;
  border-radius:50%;
  margin-right:50px;
`

function About() {
  return (<Wrapper>
    <Article>
      <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '50px' }}>关于黑曜石图床</h1>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“黑曜石图床”是本人基于兴趣、使用leancloud接口开发的免费图床程序，也是本人的一个React练手项目。</P>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一入前端深似海，从此头发是路人</P>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;希望本站能够帮到你，如遇任何问题，点此反馈。 <A href="https://github.com/Gaocarri/obsidian-figure/issues" target="_blank">GitHub</A></P>
    </Article>

    <Article>
      <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '50px' }}>关于我</h1>
      <Div>
        <Img src={avatar} alt="头像" />
        <div style={{ marginRight: '50px' }}>
          <h2>Gaocarri</h2>
          <span>一个头快秃了的前端</span>
        </div>
        <div>
          <h2>邮箱</h2>
          <A href="mailto:gaocarri@gmail.com">gaocarri@gmail.com</A>
        </div>
      </Div>
    </Article>
  </Wrapper>)
}

export default About