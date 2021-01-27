import React from 'react'
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { useStores } from '../stores'

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

            window.file = file;

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


    // css in js
    const Img = styled.img`
        max-width: 300px;
    `
    const Wrapper = styled.div`
        margin-top: 20px;
        padding: 20px;
        border: 3px dotted grey;
    `

    // 给个别名 这玩意实在是太长了
    let serverFileUrl;
    ImageStore.serverFile && (serverFileUrl = ImageStore.serverFile.attributes.url.attributes.url)

    return (
        <div>
            <Spin tip="上传中..." spinning={ImageStore.isUploading}>
                <Dragger {...props}>
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
                    <Wrapper>
                        <h2>上传结果</h2>
                        <dl>
                            <dt>结果链接</dt>
                            <dd>{serverFileUrl}</dd>
                            <dt>预览链接</dt>
                            <dd><a href={serverFileUrl} target="_blank" rel="noreferrer">这里</a></dd>
                            <dt>预览图片</dt>
                            <dd>
                                <Img src={serverFileUrl} alt="碎了的图片呜呜呜" />
                            </dd>
                        </dl>

                    </Wrapper>
                    : <></>

            }
        </div>
    )
})

export default Uploader;