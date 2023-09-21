import { Badge, Button, Popconfirm } from 'antd';
import React from 'react';
import todoStyle from '../../styles/todo.module.css';
import { CloseOutlined } from '@ant-design/icons';

const ProjectItem = ({ id, getProjId, name, getProject, deleteProject }) => {
  const getId = () => {
    getProject(`${name}:${id}`);
    getProjId(id);
  };

  return (
    <div>
      <div>
        <div className={todoStyle.project__item}>
          <div className={todoStyle.project__badge__title}>
            <h3 className={todoStyle.project__name} onClick={getId}>{name}</h3>
            <Badge dot color='green' status='processing' />
          </div>
          <Popconfirm
            placement='right'
            title='Are you sure to delete this project?'
            okText='Delete'
            cancelText='No'
            onConfirm={() => deleteProject(id)}
          >
            <Button type='text'>
              <CloseOutlined />
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
