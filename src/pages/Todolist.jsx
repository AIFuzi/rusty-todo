import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import todoStyle from '../styles/todo.module.css';
import UserPanel from '../components/tasks/UserPanel';
import ProjectsScroll from '../components/tasks/ProjectsScroll';
import TasksPanel from '../components/tasks/TasksPanel';
import jwtDecode from 'jwt-decode';

const Todolist = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [name, setName] = useState('');
  const [projId, setProjId] = useState(0);

  const getProjectTitle = (newTitle) => {
    setProjectTitle(newTitle);
  };

  useEffect(() => {
    setName(jwtDecode(localStorage.getItem('tok')).user_name);
  }, []);

  return (
    <div>
      <div className={todoStyle.todo__wrapper}>
        <div className={todoStyle.todo__left__pannel}>
          <UserPanel name={name} />
          <ProjectsScroll
            projectId={setProjId}
            projectTitle={getProjectTitle}
          />
        </div>
        {projectTitle.trim() !== ''
          ? (
            <TasksPanel
              projectTitle={projectTitle}
              username={name}
              projectId={projId}
            />
          )
          : (
            <div className={todoStyle.empty__center}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='Not selected project'
              />
            </div>
          )}
        <div className={todoStyle.todo__right__pannel}></div>
      </div>
    </div>
  );
};

export default Todolist;
