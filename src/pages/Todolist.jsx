import { Empty } from 'antd';
import React, { useState } from 'react';
import todoStyle from '../styles/todo.module.css';
import UserPanel from '../components/tasks/UserPanel';
import ProjectsScroll from '../components/tasks/ProjectsScroll';
import TaksPanel from '../components/tasks/TaksPanel';

const Todolist = () => {
  const [projectTitle, setProjectTitle] = useState('');

  const getProjectTitle = (newTitle) => {
    setProjectTitle(newTitle);
  };

  return (
    <div>
      <div className={todoStyle.todo__wrapper}>
        <div className={todoStyle.todo__left__pannel}>
          <UserPanel />
          <ProjectsScroll projectTitle={getProjectTitle} />
        </div>
        {projectTitle.trim() !== ''
          ? <TaksPanel projectTitle={projectTitle} />
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
