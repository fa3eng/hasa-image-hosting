import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {Button} from 'antd'

import { useStores } from '../stores'

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

const Index = observer(() => {
    const { UserStore, AuthStore } = useStores();
    const history = useHistory();

    const handleLogout = () => {
        AuthStore.logout();
    }

    const handleLogin = () => {
        history.push('/login');
    }

    const handleRegister = () => {
        history.push('/register');
    }

    useEffect(()=>{
        UserStore.pullUser();
    },[])

    return (
        <Header>
            <nav>
                <StyleNavlink to = "/" activeClassName={"active"} exact>首页</StyleNavlink>
                <StyleNavlink to = "/history">上传历史</StyleNavlink>
                <StyleNavlink to = "/about">关于我</StyleNavlink>
            </nav>
            <Login>
                {
                    UserStore.currentUser ? <>
                        <span>{UserStore.currentUser.attributes.username}</span>
                        <StyleButton type="primary" onClick= {handleLogout}>注销</StyleButton>
                    </> : <>
                        <StyleButton type="primary" onClick= {handleLogin}>登录</StyleButton>
                        <StyleButton type="primary" onClick= {handleRegister}>注册</StyleButton>
                    </>
                }
            </Login>
        </Header>
    )
})


export default Index;