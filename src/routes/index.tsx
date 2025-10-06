import { Route, Routes as HashRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ErrorPages from '@/pages/error';
import Login from '@/pages/Aula/Mobile/Login';
 

export default function AppRoutes() {
  return (
    <HashRouter>
      <Route path="account/*" element={<Login />} />
      <Route path="/error/*" element={<ErrorPages />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </HashRouter>
  );
}