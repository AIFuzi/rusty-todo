import React from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../router/router";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <Routes>
      {PublicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="/*" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
