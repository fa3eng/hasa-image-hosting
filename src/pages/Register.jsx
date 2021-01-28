import React from 'react'
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import styled, {keyframes} from 'styled-components'
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {useStores} from '../stores'

const index = observer(() => {

    const {AuthStore} = useStores();
    const history = useHistory();


        //#region 样式 
    // 淡入动画效果, styled-components 暴露出的API
    const fade = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
    `

    const Wrapper = styled.div`
        max-width: 600px;
        margin: 30px auto;
        padding: 30px 20px;
        border-radius: 10px;
        box-shadow: 3px 3px 20px #bebebe;
        background-color: #fff;
        animation: ${fade} 1500ms ease;
    `

    const StyleButton = styled(Button)`
        border-radius: 4px;
    `

    const A = styled.a`
        margin-left: 20px;
    `

    const StyleInput = styled(Input)`
        height: 40px;
        border-radius: 4px;
    `
    //#endregion

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values) => {
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.register()
            .then(() => {
                history.push('/login');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const validatorUsername = (rule, value) => {
        if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
        if(value.length < 4 || value.length > 10)  return Promise.reject('长度为4-10个字符');
        return Promise.resolve();
    }

    const validateConfirm = ({getFieldValue}) => ({
        validator(rule, value){
            if(getFieldValue('password') === value) return Promise.resolve();
            return Promise.reject('两次密码不一致');
        }
    })

    const handleClick = () => {
        history.push('/login');
    }

    return (
        <Wrapper>
            <Form
                name="normal_login"
                className="login-form"
                wrapperCol={{span:12, offset: 6}}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item><h1>注册</h1></Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                        {
                            validator: validatorUsername
                        }
                    ]}
                >
                    <StyleInput prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        {
                            min: 4,
                            message: '最少4个字符'
                        },
                        {
                            max: 10,
                            message: '最大10个字符'
                        }
                    ]}
                >
                    <StyleInput
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        validateConfirm
                    ]}
                >
                    <StyleInput
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="确认密码"
                    />
                </Form.Item>


                <Form.Item>
                    <StyleButton type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </StyleButton>
                    <A onClick={handleClick}><ArrowRightOutlined/>&nbsp;已有账号?</A>
                </Form.Item>
            </Form>

        </Wrapper>
    );
})

export default index;