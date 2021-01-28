import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Input, Popconfirm, message } from 'antd';
import copy from 'copy-to-clipboard';

// 呜呜呜终于实现了一个组件的复用了
const ResultLink = observer((props) => {

    // css in js
    const Img = styled.img`
        margin-top: 20px;
        max-width: 200px;
        max-height: 200px;
        box-shadow: 3px 3px 10px #d9d9d9;
    `
    const Wrapper = styled.div`
        margin-top: 20px;
        padding: 50px;
        background-color: #fff;
        border: 1px dashed #d9d9d9;
    `

    const Container = styled.div`
        display: flex !important;
        flex-wrap: wrap;
        margin-top: 30px;
        justify-content: space-between;
    `

    const StyleInput = styled(Input)`
        width: 550px;
    `
    const serverFileUrl = props.url;

    console.log(props);

    const refURL = useRef(null);
    const refHTML = useRef(null);

    const copyLink = (ref, method) => {
        return () => {
            if (method === 'URL') {
                copy(ref.current.state.value);
                message.success('拷贝成功!');
            } else if (method === 'HTML') {
                copy(`<img src="${ref.current.state.value}" alt=""/>`);
                message.success('拷贝成功!');
            } else if (method === 'Markdown') {
                copy(`![](${ref.current.state.value})`);
                message.success('拷贝成功!');
            }
        }
    }

    const handleHTML = (ref) => {
        return `<img src="${ref}" alt=""/>`
    }

    const handleMarkdown = (ref) => {
        return `![](${ref})`;
    }

    return (
        <div>
            <Wrapper>
                <Container>
                    <div>
                        <h3>预览图片</h3>
                        <a href={serverFileUrl} target="_blank" rel="noreferrer"><Img src={serverFileUrl} alt="" /></a>
                    </div>
                    <div>
                        <h3>结果链接</h3>

                        <ul>
                            <li>
                                <h4>
                                    <Popconfirm title="是否要复制内容到剪贴板？" okText="是" cancelText="否" onConfirm={copyLink(refURL, "URL")}>
                                        <a>👉&nbsp;URL(复制):</a>
                                    </Popconfirm>
                                </h4>
                                <StyleInput type="text" value={serverFileUrl} ref={refURL} />
                            </li>

                            <li>
                                <h4>
                                    <Popconfirm title="是否要复制内容到剪贴板？" okText="是" cancelText="否" onConfirm={copyLink(refURL, "HTML")}>
                                        <a>👉&nbsp;HTML(复制):</a>
                                    </Popconfirm>
                                </h4>
                                <StyleInput type="text" value={handleHTML(serverFileUrl)} ref={refHTML} />
                            </li>

                            <li>
                                <h4>
                                    <Popconfirm title="是否要复制内容到剪贴板？" okText="是" cancelText="否" onConfirm={copyLink(refURL, "Markdown")}>
                                        <a>👉&nbsp;Markdown(复制):</a>
                                    </Popconfirm>
                                </h4>
                                <StyleInput type="text" value={handleMarkdown(serverFileUrl)} />
                            </li>
                        </ul>
                    </div>
                </Container>


            </Wrapper>
        </div>
    )
})

export default ResultLink;