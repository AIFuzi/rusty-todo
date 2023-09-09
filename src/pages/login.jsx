import { Button, Checkbox, Input, Space } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStyle from '../styles/auth.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { AuthContext } from '../context/context';

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuth } = useContext(AuthContext);
  const login = () => {
    setIsAuth(true);
    localStorage.setItem('tok', 'awdaw');
  };

  return (
    <div className={authStyle.auth__wrapp}>
      <div className={authStyle.auth__back}>
        <Title>SIGN IN</Title>
        <Space direction='vertical' size='middle'>
          <Input size='large' placeholder='Login' />
          <Input
            size='large'
            status=''
            type='password'
            placeholder='Password'
          />

          <div>
            <Checkbox>Remember me</Checkbox>
            <Link>Forgot password?</Link>
          </div>

          <div>
            <Title level={5}>No account?</Title>
            <Link onClick={() => navigate('/registation')}>Sign up</Link>
          </div>

          <Link onClick={() => navigate('/todo')}>todo</Link>

          <Button onClick={login} type='primary' size='large'>
            Sign in
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Login;
