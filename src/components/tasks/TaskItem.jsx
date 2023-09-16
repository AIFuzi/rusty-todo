import React from 'react';
import todoStyle from '../../styles/todo.module.css';
import { Checkbox } from 'antd';

const TaskItem = ({ id, label, status }) => {
  return (
    <div className={todoStyle.task}>
      <div className={todoStyle.task__content__wrap}>
        <Checkbox checked={status} />
        <div className={todoStyle.task__content}>
          <span className={todoStyle.task__low__priority}>
            Low priority
          </span>
          <h3>{label}</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
