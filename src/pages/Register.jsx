import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Register</h1>

      <Button onClick={() => navigate("/login")}>Login</Button>
    </div>
  );
};

export default Register;
