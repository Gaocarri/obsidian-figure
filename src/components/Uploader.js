import React, { useRef } from 'react'
import { useStores } from '../stores'
import { observer, useLocalStore } from 'mobx-react'
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const { Dragger } = Upload;

const Result = styled.div`
  margin-top:30px;
  border:1px dashed #ccc;
  padding:20px
`

const H1 = styled.h1`
margin:20px 0;
text-align:center;
`

const Image = styled.img`
  max-width:300px;
  border:none;
`

const A = styled.a`
  color:blue;
`

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores()
  const ref1 = useRef()
  const ref2 = useRef()
  const store = useLocalStore(
    () => ({
      width: null,
      setWidth(width) {
        store.width = width
      },
      get WidthStr() {
        return store.width ? `/w/${store.width}` : ''
      },
      height: null,
      setHeight(height) {
        store.height = height
      },
      get HeightStr() {
        return store.height ? `/h/${store.height}` : ''
      },
      get fullStr() {
        return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.WidthStr + store.HeightStr
      }
    })
  )

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value)
  }

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value)
  }

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (!UserStore.currentUser) {
        message.warning('请先登录再上传!')
        return false
      }
      window.file = file
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传svg/png/jpg/gif格式的图片')
        return false
      }

      if (file.size > 1024 * 1024) {
        message.error('图片最大1M')
        return false
      }

      ImageStore.upload()
        .then((serverFile) => {
          message.success('上传成功')
        })
        .catch(err => {
          message.error('上传失败,服务器出问题了')
        })
      return false;
    }
  }

  return (
    <div>
      <Spin tip='正在用力上传' spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽上传图片</p>
          <p className="ant-upload-hint">
            支持上传png/gif/jpg/svg格式的图片,图片最大1M
        </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ?
          <Result>
            <H1>上传结果</H1>
            <dl>
              <dt>
                线上地址:
            </dt>
              <dd><A target="_blank" href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</A></dd>

              <dt>文件名称:</dt>
              <dd>{ImageStore.filename}</dd>

              <dt>图片预览:</dt>
              <dd><Image src={ImageStore.serverFile.attributes.url.attributes.url} alt={ImageStore.filename} /></dd>

              <dt>更多尺寸:</dt>
              <dd>
                <input onChange={bindWidthChange} placeholder="最大宽度(可选)" ref={ref1} style={{ marginRight: '20px' }} />
                <input onChange={bindHeightChange} placeholder="最大高度(可选)" ref={ref2} />
              </dd>
              <dd>
                <A target="_blank" href={store.fullStr}>{store.fullStr}</A>
              </dd>
            </dl>
          </Result>
          : null
      }
    </div >
  )
})

export default Component