import {
  Avatar,
  Button,
  Input,
  Menu,
  message,
  Modal,
  Progress,
  Space,
  Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import { invoke } from '@tauri-apps/api';
import {
  PieChartOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import todoStyle from '../styles/todo.module.css';
import Link from 'antd/es/typography/Link';
import TaskItem from '../components/tasks/TaskItem';
import { getErrorMessage } from '../messages/message';

const { Title } = Typography;

const Todolist = () => {
  const { setIsAuth } = useContext(AuthContext);
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState([]);
  const [modalProject, setModalProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const logout = async () => {
    await invoke('logout_user', { token: localStorage.getItem('tok') });
    localStorage.clear();
    setIsAuth(false);
  };

  const createProject = async () => {
    if (projectName.trim() == '') {
      getErrorMessage('Project name empty', messageApi);
      return;
    }

    await invoke('create_project', { userId: 1, projectName: projectName });
    setIndex(index + 1);
    setItems([...items, {
      label: projectName,
      key: index,
      icon: <PieChartOutlined />,
    }]);

    setProjectName('');
    setModalProject(false);
  };

  const openProjectModal = () => {
    setModalProject(true);
  };

  const handleCancel = () => {
    setModalProject(false);
  };

  return (
    <div>
      {contextHolder}
      <Modal open={modalProject} onOk={createProject} onCancel={handleCancel}>
        <Space direction='vertical' size='large' style={{ display: 'flex' }}>
          <Title level={3}>Create project</Title>
          <Input
            placeholder='Project name'
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </Space>
      </Modal>
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
                <Button type='text' onClick={openProjectModal}>
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
          <div className={todoStyle.todo__center__wrap}>
            <div className={todoStyle.todo__center__title}>
              <h1>Project 1</h1>
              <h2 className={todoStyle.title__job}>good job, user</h2>
            </div>
            <div className={todoStyle.stats__wrap}>
              <div className={todoStyle.stats__day}>
                <h2>WED</h2>
                <h1>13</h1>
                <h3>SEPTEMBER</h3>
              </div>
              <Progress type='circle' percent={0} />
            </div>
            <div className={todoStyle.tasks__wrap}>
              <div>
                <Title level={3}>Tasks:</Title>
              </div>
              <div className={todoStyle.task__scroll}>
                <div className={todoStyle.tasks__completed}>
                  <TaskItem />
                  <TaskItem />
                </div>
              </div>
            </div>
            <div className={todoStyle.task__addinput}>
              <Input size='large' placeholder='Add task' />
            </div>
          </div>
        </div>
        <div className={todoStyle.todo__right__pannel}></div>
      </div>
    </div>
  );
};

export default Todolist;
