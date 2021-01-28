import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {Button} from 'antd'

import { useStores } from '../stores'

const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 12px 100px;
    background-color: #ffffff;
    color: #262626;
`;

const StyleNavLink = styled(NavLink)`
    color: #262626;
    padding-bottom: 10px;
    margin-left: 40px;

    &.active{
        border-bottom: 2px solid #3f90f7;
    }
`;

const Login = styled.div`
    margin-left: auto;
`

const StyleButton = styled(Button)`
    margin-left: 20px;
    font-weight: bolder;
    font-size: 14px;
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
                <StyleNavLink to = "/" activeClassName={"active"} exact>首页</StyleNavLink>
                <StyleNavLink to = "/history">历史</StyleNavLink>
                <StyleNavLink to = "/about">关于</StyleNavLink>
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