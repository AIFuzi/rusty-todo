import React, { useEffect, useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import Title from 'antd/es/typography/Title';
import ProjectTitle from './ProjectTitle';
import { Empty, Progress, Select } from 'antd';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import { invoke } from '@tauri-apps/api';
import SortSelect from './SortSelect';

const TasksPanel = ({ projectId, projectTitle, username }) => {
  const [tasks, setTasks] = useState([]);
  const [percent, setPercent] = useState(0);
  const [newId, setNewId] = useState(0);

  useEffect(() => {
  }, [newId]);

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

  const sortTasks = (sort) => {
    setTasks([...tasks].sort((a, b) => a[sort].localeCompare(b[sort])));
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
          <div className={todoStyle.tasks__title}>
            <Title level={3}>Tasks:</Title>
            <Select
              onChange={sortTasks}
              defaultValue='sort'
              options={[
                { value: 'sort', label: 'Sort by', disabled: true },
                { value: 'task_name', label: 'Name' },
                { value: 'priority', label: 'Priority' },
              ]}
            />
          </div>
          <div className={todoStyle.task__scroll}>
            <div className={todoStyle.tasks__completed}>
              {tasks.length <= 0
                ? <Empty description='Create first task' />
                : tasks.map((task) => (
                  <TaskItem
                    key={task.id !== undefined ? task.id : task.id = newId}
                    id={task.id !== undefined ? task.id : task.id = newId}
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
          <AddTask
            newId={setNewId}
            projectId={projectId}
            newTask={setTasks}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TasksPanel;
