import { Button, Checkbox, ConfigProvider, Input, Space, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStyle from "../styles/auth.module.css";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";

const Login = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,

        token: {
          colorPrimary: "#95de64",
          colorTextBase: "#fff",
          colorLink: "#95de64",
        },
      }}
    >
      <div className={authStyle.auth__wrapp}>
        <div className={authStyle.auth__back}>
          <Title>SIGN IN</Title>
          <Space direction="vertical" size="middle">
            <Input size="large" placeholder="Login" />
            <Input
              size="large"
              status=""
              type="password"
              placeholder="Password"
            />

            <div>
              <Checkbox>Remember me</Checkbox>
              <Link>Forgot password?</Link>
            </div>

            <div>
              <Title level={5}>No account?</Title>
              <Link onClick={() => navigate("/registation")}>Sign up</Link>
            </div>

            <Button type="primary" size="large">
              Sign in
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
