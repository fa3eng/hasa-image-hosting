import React from 'react'
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react'

import { useStores } from '../stores'
import ResultLink from './ResultLink'

const Uploader = observer(() => {

    const { ImageStore, UserStore } = useStores();

    const { Dragger } = Upload;
    
    const props = {
        beforeUpload: file => {
            // 登录条件
            if (UserStore.currentUser === null) {
                message.error('请先登录!');
                return false;
            }
            // 类型判断
            if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
                message.error('只能上传svg, png, jpg, jpeg, gif格式的文件');
                return false;
            }
            if (file.size > 1014 * 1024) {
                message.error('图片最大1M');
            }

            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            ImageStore.upload()
                .then(() => {
                    console.log('上传成功');
                    message.success('This is a success message');
                })
                .catch(() => {
                    console.log('上传失败');
                });
            return false;
        }
    };


    return (
        <div>
            <Spin tip="上传中..." spinning={ImageStore.isUploading}>
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或者拖拽图片到这里上传</p>
                    <p className="ant-upload-hint">
                        只能上传svg, png, jpg, jpeg, gif格式的文件, 图片最大1M
                </p>
                </Dragger>
            </Spin>
            {
                ImageStore.serverFile ?
                    <ResultLink url={ImageStore.serverFile.attributes.url.attributes.url} />
                    : <></>
            }
        </div>
    )
})

export default Uploader;