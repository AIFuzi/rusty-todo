import React from 'react';
import todoStyle from '../styles/todo.module.css';

const DatePanel = () => {
  const dateDay = () => {
  };

  return (
    <div className={todoStyle.stats__day}>
      <h2>
        {Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date())}
      </h2>
      <h1>
        {Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date())}
      </h1>
      <h3>
        {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date())}
      </h3>
    </div>
  );
};

export default DatePanel;
