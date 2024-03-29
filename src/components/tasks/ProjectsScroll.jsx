import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import ProjectItem from './ProjectItem';
import { Button, Input, message, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import todoStyle from '../../styles/todo.module.css';
import { invoke } from '@tauri-apps/api';
import { getErrorMessage } from '../../messages/message';
import jwtDecode from 'jwt-decode';

const ProjectsScroll = ({ projectId, projectTitle }) => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [modalProject, setModalProject] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [newId, setNewId] = useState(0);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
  }, [newId]);

  const createProject = async () => {
    if (projectName.trim() == '') {
      getErrorMessage('Project name empty', messageApi);
      return;
    }

    setNewId(
      await invoke('create_project', {
        userLogin: jwtDecode(localStorage.getItem('tok')).user_login,
        projectName: projectName,
      }),
    );
    setProjects([...projects, { project_name: projectName }]);

    setProjectName('');
    setModalProject(false);
  };

  const deleteProject = async (id) => {
    await invoke('delete_project', { projectId: id });
    setProjects(projects.filter((p) => p.id !== id));
    projectTitle = '';
  };

  const getProjects = async () => {
    setProjects(
      await invoke('get_projects_by_user_login', {
        userLogin: jwtDecode(localStorage.getItem('tok')).user_login,
      }),
    );
  };

  const openProjectModal = () => {
    setModalProject(true);
  };

  const handleCancel = () => {
    setModalProject(false);
  };

  return (
    <div className={todoStyle.todo__scroll}>
      {contextHolder}
      <Modal open={modalProject} onOk={createProject} onCancel={handleCancel}>
        <Space direction='vertical' size='large' style={{ display: 'flex' }}>
          <Title level={3}>Create project</Title>
          <Input
            showCount
            maxLength={25}
            placeholder='Project name'
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </Space>
      </Modal>
      <div className={todoStyle.todo__projects}>
        <div className={todoStyle.todo__projects__title}>
          <Title level={3}>Projects</Title>
          <Button type='text' onClick={openProjectModal}>
            <PlusOutlined style={{ color: '#fff' }} />
          </Button>
        </div>
        <div className={todoStyle.projects__list}>
          {projects.length > 0
            ? projects.map((project) => (
              <ProjectItem
                key={project.id !== undefined ? project.id : project.id = newId}
                id={project.id !== undefined ? project.id : project.id = newId}
                getProjId={projectId}
                name={project.project_name}
                getProject={projectTitle}
                deleteProject={deleteProject}
              />
            ))
            : <Title level={5}>No projects found</Title>}
        </div>
      </div>
    </div>
  );
};

export default ProjectsScroll;
