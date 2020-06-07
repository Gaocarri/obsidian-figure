import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  padding:10px 100px;
  text-align:center;
  font-size:12px;
  background-color:#02101f;
  color:#fff;
`
const Span = styled.span`
  color:#ccc
`

function Component() {
  return (<>
    <Footer>
      <Span>Copyright © 2020 黑曜石图床 Powered by GaoCarri</Span>
    </Footer>
  </>)
}

export default Component