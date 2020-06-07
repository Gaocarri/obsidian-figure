import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd'
import styled from 'styled-components'

const Img = styled.img`
  width:100px;
  height:120px;
  object-fit:contain;
  border:none;
`

const A = styled.a`
  color:blue;
`

const StyledListItem = styled(List.Item)`
  background-color:#FAFAFA;
  margin-bottom:40px;
  padding:20px 40px;
`

const Component = observer(() => {
  const { HistoryStore } = useStores()

  const loadMore = () => {
    HistoryStore.find()
  }

  useEffect(() => {
    return () => { HistoryStore.reset() }
  }, [])

  return (
    <div>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={true}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item => <StyledListItem key={item.id}>
              <div>
                <Img src={item.attributes.url.attributes.url} />
              </div>

              <div>
                <h5>{item.attributes.FileName}</h5>
              </div>

              <div>
                <A target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</A>
              </div>
            </StyledListItem>
          }
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip='加载中' />
            </div>)
          }
        </List>
      </InfiniteScroll>
    </div>
  )
})

export default Component