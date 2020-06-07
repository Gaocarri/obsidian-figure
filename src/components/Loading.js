import React from 'react'
import { Spin } from 'antd'

function Loading() {
  return (
    <div style={{ marginTop: '200px', display: 'flex', justifyContent: 'center' }}>
      <Spin tip="页面加载中...">
      </Spin>
    </div>
  )
}

export default Loading