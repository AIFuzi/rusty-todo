import { Button } from 'antd';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/context';
import { invoke } from '@tauri-apps/api';

const Todolist = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = async () => {
    // setIsAuth(false);
    // localStorage.removeItem('tok');

    console.log(localStorage.getItem('us_lg'));
    await invoke('logout_user', { token: localStorage.getItem('tok') });
    localStorage.removeItem('tok');
    setIsAuth(false);
  };

  useEffect(() => {
    if (localStorage.getItem('tok')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Button onClick={logout}>
      Logout
    </Button>
  );
};

export default Todolist;
