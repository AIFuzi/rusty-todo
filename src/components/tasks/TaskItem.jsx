import React from 'react';
import todoStyle from '../../styles/todo.module.css';
import { Checkbox } from 'antd';

const TaskItem = ({ label, priority, status }) => {
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

  return (
    <div className={todoStyle.task}>
      <div className={todoStyle.task__content__wrap}>
        <Checkbox checked={status} />
        <div className={todoStyle.task__content}>
          <span style={{ color: getPriorityColor() }}>
            {priority} priority
          </span>
          <h3>{label}</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
