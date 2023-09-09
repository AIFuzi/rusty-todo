import { Button, Checkbox, Input, message, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStyle from '../styles/auth.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { invoke } from '@tauri-apps/api';
import { AuthContext } from '../context/context';

const Register = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [inputDisable, setInputDisable] = useState(false);
  const [error, setError] = useState('');

  const { setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginUser = (token) => {
    localStorage.setItem('tok', token);
    setIsAuth(true);
  };

  useEffect(() => {
    if (result.trim() !== '') {
      let res = result.split(':');

      if (res[0] == 'SUCCESS') {
        loginUser(res[1]);
      } else {
        setInputDisable(false);
        errorMessage(res[1]);
        setError(res[1]);
      }
    }
  }, [result]);

  const errorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const registerUser = async () => {
    if (login.trim() == '') {
      errorMessage('Login field empty');
      return;
    } else if (name.trim() == '') {
      errorMessage('Name field empty');
      return;
    } else if (password.trim() == '' && confirPassword.trim() == '') {
      errorMessage('Password field empty');
      return;
    } else if (password !== confirPassword) {
      errorMessage('Password dont math');
      return;
    }

    setInputDisable(true);

    setResult(
      await invoke('register_user', {
        userLogin: login,
        userName: name,
        pass: password,
      }),
    );

    if (error) {
      setInputDisable(false);
      errorMessage(error);
    }
  };

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
              disabled={inputDisable}
            />
            <Input
              onChange={(e) => setName(e.target.value)}
              size='large'
              placeholder='Name'
              disabled={inputDisable}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              size='large'
              type='password'
              placeholder='Password'
              disabled={inputDisable}
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              size='large'
              type='password'
              placeholder='Password repeat'
              disabled={inputDisable}
            />

            <Checkbox>Remember me</Checkbox>

            <div>
              <Title level={5}>Do you have an account?</Title>
              <Link onClick={() => navigate('/login')}>Sign in</Link>
            </div>

            <Button
              disabled={inputDisable}
              onClick={registerUser}
              type='primary'
              size='large'
            >
              Sign up
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Register;
