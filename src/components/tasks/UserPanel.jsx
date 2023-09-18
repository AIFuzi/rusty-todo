import React, { useContext } from 'react';
import todoStyle from '../../styles/todo.module.css';
import { Avatar } from 'antd';
import Link from 'antd/es/typography/Link';
import Title from 'antd/es/typography/Title';
import { UserOutlined } from '@ant-design/icons';
import { invoke } from '@tauri-apps/api';
import { AuthContext } from '../../context/context';

const UserPanel = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = async () => {
    await invoke('logout_user', { token: localStorage.getItem('tok') });
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <div className={todoStyle.todo__user__pannel}>
      <Avatar size={46} icon={<UserOutlined />} />
      <div>
        <Title level={5}>User name</Title>
        <Link onClick={logout}>Logout</Link>
      </div>
    </div>
  );
};

export default UserPanel;
