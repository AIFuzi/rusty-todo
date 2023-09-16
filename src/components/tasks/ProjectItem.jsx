import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import todoStyle from '../../styles/todo.module.css';
import { CloseOutlined } from '@ant-design/icons';
import { invoke } from '@tauri-apps/api';

const ProjectItem = ({ id, name, getProject }) => {
  const getId = () => {
    getProject(`${name}:${id}`);
  };

  const deleteProject = async () => {
    await invoke('delete_project', { projectId: id });
  };

  return (
    <div>
      <div>
        <div className={todoStyle.project__item}>
          <h3 className={todoStyle.project__name} onClick={getId}>{name}</h3>
          <Button type='text' onClick={deleteProject}>
            <CloseOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
