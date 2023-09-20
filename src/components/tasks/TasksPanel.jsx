import React, { useEffect, useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import Title from 'antd/es/typography/Title';
import ProjectTitle from './ProjectTitle';
import { Empty, Progress } from 'antd';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import { invoke } from '@tauri-apps/api';

const TasksPanel = ({ projectId, projectTitle, username }) => {
  const [tasks, setTasks] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(
      Math.round(
        (tasks.filter((p) => p.status == true).length / tasks.length) * 100,
      ),
    );
  }, []);

  const deleteTask = async (id) => {
    await invoke('delete_task_by_id', { taskId: id });
    setTasks(tasks.filter((p) => p.id !== id));
  };

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
          <Progress
            type='circle'
            percent={percent}
          />
        </div>
        <div className={todoStyle.tasks__wrap}>
          <div>
            <Title level={3}>Tasks:</Title>
          </div>
          <div className={todoStyle.task__scroll}>
            <div className={todoStyle.tasks__completed}>
              {tasks.length <= 0
                ? <Empty description='Create first task' />
                : tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    priority={task.priority}
                    label={task.task_name}
                    loadStatus={task.status}
                    deleteTask={deleteTask}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={todoStyle.task__addinput}>
          <AddTask projectId={projectId} newTask={setTasks} tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TasksPanel;
