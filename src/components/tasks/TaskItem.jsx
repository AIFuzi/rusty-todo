import React from 'react';
import todoStyle from '../../styles/todo.module.css';
import { Checkbox } from 'antd';

const TaskItem = () => {
  return (
    <div className={todoStyle.task}>
      <div className={todoStyle.task__content__wrap}>
        <Checkbox />
        <div className={todoStyle.task__content}>
          <span className={todoStyle.task__low__priority}>
            Low priority
          </span>
          <h3>Task 1</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
