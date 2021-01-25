import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 15px 100px;
    background-color: #02101f;
    color: #fff;
`;

const StyleNavlink = styled(NavLink)`
    color: #fff;
    margin-left: 40px;

    &.active{
        border-bottom: 2px solid #fff;
    }
`;



export default function index() {
    return (
        <Header>
            <nav>
                <StyleNavlink to = "/" activeClassName={"active"} exact>首页</StyleNavlink>
                <StyleNavlink to = "/history">上传历史</StyleNavlink>
                <StyleNavlink to = "/about">关于我</StyleNavlink>
            </nav>
        </Header>
    )
}