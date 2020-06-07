import React, { useRef } from 'react'
import { useStores } from '../stores'
import { observer, useLocalStore } from 'mobx-react'
import { Upload, message } from 'antd';
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
text-align:center
`

const Image = styled.img`
  max-width:300px
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
        console.log('hi')
        message.warning('请先登录再上传!')
        return false
      }
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        })
        .catch(err => {
          console.log('上传失败')
          console.log(err)
        })
      return false;
    }
  }

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      {
        ImageStore.serverFile ?
          <Result>
            <H1>上传结果</H1>
            <dl>
              <dt>
                线上地址
            </dt>
              <dd><A target="_blank" href={ImageStore.serverFile.attributes.url.attributes.url}>ImageStore.serverFile.attributes.url.attributes.url</A></dd>

              <dt>文件名称</dt>
              <dd>{ImageStore.filename}</dd>

              <dt>图片预览</dt>
              <dd><Image src={ImageStore.serverFile.attributes.url.attributes.url} alt={ImageStore.filename} /></dd>

              <dt>更多尺寸</dt>
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
    </div>
  )
})

export default Component