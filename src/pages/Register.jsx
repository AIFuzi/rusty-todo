import { Button, Checkbox, Input, message, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStyle from '../styles/auth.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { invoke } from '@tauri-apps/api';

const Register = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  async function registerUser() {
    if (
      login.trim() !== '' &&
      name.trim() !== '' &&
      password.trim() !== '' &&
      confirPassword.trim() !== ''
    ) {
      setToken(
        await invoke('register_user', {
          userLogin: login,
          userName: name,
          pass: password,
        }),
      );

      localStorage.setItem('tok', token);

      messageApi.open({
        type: 'success',
        content: 'USER CREATE',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'NE ZAEBCA FIELDS EMPTY',
      });
    }
  }

  return (
    <div>
      {contextHolder}
      <div className={authStyle.auth__wrapp}>
        <div className={authStyle.auth__back}>
          <Title>SIGN UP</Title>

          <Space direction='vertical' size='middle'>
            <Input
              onChange={(e) => setLogin(e.target.value)}
              size='large'
              placeholder='Login'
            />
            <Input
              onChange={(e) => setName(e.target.value)}
              size='large'
              placeholder='Name'
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              size='large'
              type='password'
              placeholder='Password'
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              size='large'
              type='password'
              placeholder='Password repeat'
            />

            <Checkbox>Remember me</Checkbox>

            <div>
              <Title level={5}>Do you have an account?</Title>
              <Link onClick={() => navigate('/login')}>Sign in</Link>
            </div>

            <Button onClick={registerUser} type='primary' size='large'>
              Sign up
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Register;
