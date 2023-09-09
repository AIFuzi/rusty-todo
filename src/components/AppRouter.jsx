import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../router/router';
import Register from '../pages/Register';
import { AuthContext } from '../context/context';
import Todolist from '../pages/Todolist';

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    isAuth
      ? (
        <Routes>
          {PrivateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path='/*' element={<Todolist />} />
        </Routes>
      )
      : (
        <Routes>
          {PublicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path='/*' element={<Register />} />
        </Routes>
      )
  );
};

export default AppRouter;
