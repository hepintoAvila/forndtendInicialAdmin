import { Route, Routes as HashRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ErrorPages from '@/pages/error';
import Account from '@/pages/account';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Route path="account/*" element={<Account />} />
      <Route path="/error/*" element={<ErrorPages />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </HashRouter>
  );
}