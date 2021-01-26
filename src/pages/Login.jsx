import React from 'react'
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {useStores} from '../stores'
import { useHistory } from 'react-router-dom'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Wrapper = styled.div`
    max-width: 600px;
    margin: 30px auto;
`

// 给原来的组件添加监控
const Index = observer(() => {

    const {AuthStore} = useStores();
    const history = useHistory();

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
        if(/\W/.test(value)) return Promise.reject('只能是字母或者下划线');
        if(value.length < 4 || value.length > 10)  return Promise.reject('长度为4-10个字符');
        return Promise.resolve();
    }
    
    return (
        <Wrapper>
            <span>{}</span>
            <h1>登录</h1>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>

        </Wrapper>
    );
})

export default Index;

