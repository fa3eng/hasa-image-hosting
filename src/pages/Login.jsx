import React from 'react'
import { observer } from 'mobx-react'
import styled, {keyframes} from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem'

// 给原来的组件添加监控
const Index = observer(() => {

    const { AuthStore } = useStores();
    const history = useHistory();

    //#region from表单属性
    const onFinish = (values) => {
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.login()
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 判断规则
    const validatorUsername = (rule, value) => {
        if (/\W/.test(value)) return Promise.reject('只能是字母或者下划线');
        if (value.length < 4 || value.length > 10) return Promise.reject('长度为4-10个字符');
        return Promise.resolve();
    }
    //#endregion

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

    const handleClick = () => {
        history.push('/register');
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
                <FormItem><h1>登录</h1></FormItem>
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
                    ]}
                >
                    <StyleInput
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>

                <Form.Item>
                    <StyleButton type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </StyleButton>
                    <A onClick={handleClick}><ArrowRightOutlined/>&nbsp;即刻注册</A>
                </Form.Item>
            </Form>

        </Wrapper>
    );
})

export default Index;

