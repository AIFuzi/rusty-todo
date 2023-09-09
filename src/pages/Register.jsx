import { Button, Checkbox, ConfigProvider, Input, Space, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import authStyle from "../styles/auth.module.css";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";

const Register = () => {
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
          <Title>SIGN UP</Title>

          <Space direction="vertical" size="middle">
            <Input size="large" placeholder="Login" />
            <Input size="large" placeholder="Name" />
            <Input size="large" type="password" placeholder="Password" />
            <Input size="large" type="password" placeholder="Password repeat" />

            <Checkbox>Remember me</Checkbox>

            <div>
              <Title level={5}>Do you have an account?</Title>
              <Link onClick={() => navigate("/login")}>Sign in</Link>
            </div>

            <Button type="primary" size="large">
              Sign up
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Register;
