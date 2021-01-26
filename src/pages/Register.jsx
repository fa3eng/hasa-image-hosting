import React from 'react'
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {useStores} from '../stores'

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


const index = observer(() => {

    const {AuthStore} = useStores();

    const onFinish = (values) => {
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.register()
            .then(() => {
                console.log('注册成功,跳转到首页');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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

    return (
        <Wrapper>
            <h1>注册</h1>
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
                            validator : validatorUsername
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        validateConfirm
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

export default index;