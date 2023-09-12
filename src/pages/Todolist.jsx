import { Avatar, Button, Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import { invoke } from '@tauri-apps/api';
import {
  PieChartOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import todoStyle from '../styles/todo.module.css';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';

const Todolist = () => {
  const { setIsAuth } = useContext(AuthContext);
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState([]);

  const logout = async () => {
    await invoke('logout_user', { token: localStorage.getItem('tok') });
    localStorage.clear();
    setIsAuth(false);
  };

  const createProject = () => {
    setIndex(index + 1);
    setItems([...items, {
      label: `option ${index}`,
      key: index,
      icon: <PieChartOutlined />,
    }]);
  };

  return (
    <div>
      <div className={todoStyle.todo__wrapper}>
        <div className={todoStyle.todo__left__pannel}>
          <div className={todoStyle.todo__user__pannel}>
            <Avatar size={46} icon={<UserOutlined />} />
            <div>
              <Title level={5}>User name</Title>
              <Link onClick={logout}>Logout</Link>
            </div>
          </div>
          <div className={todoStyle.todo__scroll}>
            <div className={todoStyle.todo__projects}>
              <div className={todoStyle.todo__projects__title}>
                <Title level={3}>Projects</Title>
                <Button type='text' onClick={createProject}>
                  <PlusOutlined
                    style={{ color: '#fff' }}
                  />
                </Button>
              </div>
              {items.length > 0
                ? (
                  <Menu
                    defaultSelectedKeys={['1']}
                    style={{ background: '#1a1a1a', border: 'none' }}
                    items={items}
                  />
                )
                : <Title level={4}>No created projects</Title>}
            </div>
          </div>
        </div>
        <div className={todoStyle.todo__center__pannel}>
        </div>
        <div className={todoStyle.todo__right__pannel}>Right menu</div>
      </div>
    </div>
  );
};

export default Todolist;
