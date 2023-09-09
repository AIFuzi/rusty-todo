import { ConfigProvider, theme } from 'antd';
import React from 'react';

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,

        token: {
          colorPrimary: '#95de64',
          colorTextBase: '#fff',
          colorLink: '#95de64',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
