import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
    padding: 0px 100px;
    text-align: center;
    font-size: 14px;
    color: #bbbbbb;
`

const A = styled.a`
    color: #bbbbbb;
    :hover{
        color: #40a9ff;
    }
`

export default function index() {
    return (
        <Footer>
            <A href="https://www.yuque.com/meakle">@&nbsp;方阿森</A>
        </Footer>
    )
}