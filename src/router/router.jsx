import Register from '../pages/Register';
import Login from '../pages/Login';
import Todolist from '../pages/Todolist';

export const PublicRoutes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
];

export const PrivateRoutes = [
  { path: '/todo', component: Todolist },
];
