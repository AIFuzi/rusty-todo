import React, { useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import { Button, Checkbox, Popconfirm } from 'antd';
import { invoke } from '@tauri-apps/api';
import { DeleteOutlined } from '@ant-design/icons';

const TaskItem = ({ id, label, priority, loadStatus, deleteTask }) => {
  const [status, setStatus] = useState(loadStatus);

  const getPriorityColor = () => {
    switch (priority) {
      case 'Low':
        return '#73d13d';
      case 'Medium':
        return '#e8b339';
      case 'High':
        return '#d32029';
    }
  };

  const setTaskStatus = async (e) => {
    setStatus(e.target.checked);
    await invoke('update_task_status', { taskId: id, newStatus: !status });
  };

  return (
    <div className={todoStyle.task}>
      <div className={todoStyle.task__content__wrap}>
        <Checkbox
          checked={status}
          onChange={setTaskStatus}
        />
        <div className={todoStyle.task__content}>
          <span style={{ color: getPriorityColor() }}>
            {priority} priority
          </span>
          <h3>{label}</h3>
        </div>
        <Popconfirm
          placement='topRight'
          title='Are you sure to delete this task?'
          okText='Delete'
          cancelText='No'
          onConfirm={() => deleteTask(id)}
        >
          <Button
            type='text'
            style={{ marginLeft: 'auto' }}
            // onClick={() => deleteTask(id)}
          >
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default TaskItem;
