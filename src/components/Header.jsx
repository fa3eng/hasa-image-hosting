import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'

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

const Login = styled.div`
   margin-left: auto;
`

const StyleButton = styled(Button)`
    margin-left: 20px;
`
function Index() {

    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = () => {
        setIsLogin(true);
    }

    return (
        <Header>
            <nav>
                <StyleNavlink to = "/" activeClassName={"active"} exact>首页</StyleNavlink>
                <StyleNavlink to = "/history">上传历史</StyleNavlink>
                <StyleNavlink to = "/about">关于我</StyleNavlink>
            </nav>
            <Login>
                {
                    isLogin ? <>
                        <span>meakle</span>
                        <StyleButton type="primary">注销</StyleButton>
                    </> : <>
                        <StyleButton type="primary" onClick = {handleLogin}>登录</StyleButton>
                        <StyleButton type="primary">注册</StyleButton>
                    </>
                }
            </Login>
        </Header>
    )
}


export default Index;