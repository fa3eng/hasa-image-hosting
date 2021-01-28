import React from 'react'
import { YuqueOutlined, GithubOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Footer = styled.footer`
    padding: 0px 100px;
    text-align: center;
    font-size: 15px;
    margin-bottom: 20px;
    color: #bbbbbb;
`

const A = styled.a`
    color: #bbbbbb;
    margin: 15px;
    :hover{
        color: #40a9ff;
    }
`

export default function index() {
    return (
        <Footer>
            <A href="https://www.yuque.com/meakle" target="_blank"><YuqueOutlined /></A>
            <A href="http://meakle.com/" target="_blank">@&nbsp;方阿森</A>
            <A href="https://github.com/meakle" target="_blank"><GithubOutlined /></A>
        </Footer>
    )
}