import DefaultLayout from '@/layouts/Default';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Login = lazy(() => import('./Login'));
const Logout = lazy(() => import('./Logout'));
//const Register = lazy(() => import('./Register'));
export default function Account() {
	return (
		<Routes>
			<Route path="/*" element={<DefaultLayout />}>
				
				<Route index element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="logout" element={<Logout />} />
			</Route>
		</Routes>
	);
}
