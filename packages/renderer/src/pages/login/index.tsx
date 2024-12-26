import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useRoutes, useSearchParams} from 'react-router-dom';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function Login() {
  const navigate = useNavigate()
  function onFinish(values: any) {
    console.log('提交', values)
    navigate('/windows')
  }
  return (
    <div className="w-full h-full bg-[#f4f5f7]">
      <div className="h-[calc(100%-60px)] flex items-center justify-center">
        <div className="w-[444px] flex flex-col items-center rounded-[12px] bg-white shadow-lg shadow-gray-500/50">
          <div className="pt-[20px] pb-[10px]">登录</div>
          <Form
            name="login"
            initialValues={{remember: true}}
            style={{maxWidth: 360}}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: '请输入账号!'}]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: '请输入密码!'}]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
