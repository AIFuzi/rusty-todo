import { Button, Checkbox, Input, message, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStyle from '../styles/auth.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { invoke } from '@tauri-apps/api';
import { AuthContext } from '../context/context';
import { getErrorMessage } from '../messages/message';

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
        getErrorMessage(res[1], messageApi);
        setError(res[1]);
      }
    }
  }, [result]);

  const registerUser = async () => {
    if (login.trim() == '') {
      // errorMessage('Login field empty');
      getErrorMessage('Login field empty', messageApi);
      return;
    } else if (name.trim() == '') {
      getErrorMessage('Name field empty', messageApi);
      return;
    } else if (password.trim() == '' && confirPassword.trim() == '') {
      getErrorMessage('Password field empty', messageApi);
      return;
    } else if (password !== confirPassword) {
      getErrorMessage('Password dont math', messageApi);
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
      getErrorMessage(error, messageApi);
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
