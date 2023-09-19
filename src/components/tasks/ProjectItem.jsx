import { Button } from 'antd';
import React from 'react';
import todoStyle from '../../styles/todo.module.css';
import { CloseOutlined } from '@ant-design/icons';

const ProjectItem = ({ id, name, getProject, deleteProject }) => {
  const getId = () => {
    getProject(`${name}`);
  };

  return (
    <div>
      <div>
        <div className={todoStyle.project__item}>
          <h3 className={todoStyle.project__name} onClick={getId}>{name}</h3>
          <Button type='text' onClick={() => deleteProject(id)}>
            <CloseOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
