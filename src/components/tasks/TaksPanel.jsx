import React, { useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import Title from 'antd/es/typography/Title';
import ProjectTitle from './ProjectTitle';
import { Empty, Input, Progress } from 'antd';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaksPanel = ({ projectTitle, username }) => {
  const [task, setTask] = useState([]);

  return (
    <div className={todoStyle.todo__center__pannel}>
      <div className={todoStyle.todo__center__wrap}>
        <ProjectTitle username={username} projectTitle={projectTitle} />
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
              {task.length <= 0
                ? <Empty description='Create first task' />
                : task.map((taks) => (
                  <TaskItem
                    key={taks.id}
                    id={taks.id}
                    label={taks.task_label}
                    status={taks.status}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={todoStyle.task__addinput}>
          <AddTask />
        </div>
      </div>
    </div>
  );
};

export default TaksPanel;
