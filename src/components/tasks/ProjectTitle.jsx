import React from 'react';
import todoStyle from '../../styles/todo.module.css';

const ProjectTitle = ({ projectTitle }) => {
  return (
    <div className={todoStyle.todo__center__title}>
      <h1>{projectTitle}</h1>
      <h2 className={todoStyle.title__job}>good job, user</h2>
    </div>
  );
};

export default ProjectTitle;
