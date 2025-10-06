import DefaultLayout from '@/layouts/Default';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PagInicio = lazy(() => import('./Mobile/index'));
const Login = lazy(() => import('./Mobile/Login'));
const Logout = lazy(() => import('./Mobile/Logout'));
//const Register = lazy(() => import('./Register'));
 

export default function Mobile() {
  return (
 
      <Routes>
        <Route path="/*" element={<DefaultLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="mobile" index element={<PagInicio />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
 
  );
}
 