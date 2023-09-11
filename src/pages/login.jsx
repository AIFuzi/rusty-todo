import { Button, Checkbox, Input, message, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStyle from '../styles/auth.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { AuthContext } from '../context/context';
import { getErrorMessage } from '../messages/message';
import { invoke } from '@tauri-apps/api';

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  const { setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    if (result.trim() !== '') {
      let res = result.split(':');

      if (res[0] == 'SUCCESS') {
        setLoginUser(res[1]);
      } else {
        setInputDisabled(false);
        getErrorMessage(res[1], messageApi);
        setError(res[1]);
      }
    }
  }, [result]);

  const setLoginUser = (token) => {
    localStorage.setItem('tok', token);
    localStorage.setItem('us_lg', login);
    setIsAuth(true);
  };

  const login_user = async () => {
    if (login.trim() == '') {
      getErrorMessage('Login field empty', messageApi);
      return;
    } else if (password.trim() == '') {
      getErrorMessage('Password field empty', messageApi);
      return;
    }

    setInputDisabled(true);

    console.log(error);

    setResult(
      await invoke('login_user', { login: login, pass: password }),
    );

    if (error) {
      getErrorMessage(error, messageApi);
      setInputDisabled(false);
    }
  };

  return (
    <div className={authStyle.auth__wrapp}>
      {contextHolder}
      <div className={authStyle.auth__back}>
        <Title>SIGN IN</Title>
        <Space direction='vertical' size='middle'>
          <Input
            onChange={(e) => setLogin(e.target.value)}
            size='large'
            placeholder='Login'
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
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

          <Button
            onClick={login_user}
            type='primary'
            size='large'
            disabled={inputDisabled}
          >
            Sign in
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Login;
