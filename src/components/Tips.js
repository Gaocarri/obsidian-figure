import React from 'react'
import { useStores } from '../stores'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tips = styled.div`
  background:orange;
  padding:10px;
  margin:30px 0;
  color:#fff
`

const Component = observer((props) => {
  const { UserStore } = useStores()
  return (
    <>
      {
        UserStore.currentUser ? null : <Tips>{props.children}</Tips>
      }
    </>
  )
})

export default Component