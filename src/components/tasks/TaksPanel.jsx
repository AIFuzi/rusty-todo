import React, { useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import Title from 'antd/es/typography/Title';
import ProjectTitle from './ProjectTitle';
import { Input, Progress } from 'antd';
import TaskItem from './TaskItem';

const TaksPanel = ({ projectTitle }) => {
  const [task, setTask] = useState([
    { id: 1, user_id: 1, project_id: 1, task_label: 'Task 1', status: true },
    { id: 2, user_id: 1, project_id: 1, task_label: 'Task 2', status: true },
  ]);

  return (
    <div className={todoStyle.todo__center__pannel}>
      <div className={todoStyle.todo__center__wrap}>
        <ProjectTitle projectTitle={projectTitle} />
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
              {task.map((taks) => (
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
          <Input size='large' placeholder='Add task' />
        </div>
      </div>

      <div>
      </div>
    </div>
  );
};

export default TaksPanel;
