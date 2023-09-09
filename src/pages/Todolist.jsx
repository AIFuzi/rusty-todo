import { Button } from 'antd';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/context';

const Todolist = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('tok');
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
