import DefaultLayout from '@/layouts/Default';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PagInicio = lazy(() => import('./Mobile/'));
const Login = lazy(() => import('./Mobile/Login'));
//const Register = lazy(() => import('./Register'));
export default function Account() {
	return (
		<Routes>
			<Route path="/*" element={<DefaultLayout />}>
				<Route path="login" element={<Login />} />
				{<Route path="mobile" element={<PagInicio />} />}
			</Route>
		</Routes>
	);
}
