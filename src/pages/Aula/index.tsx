import DefaultLayout from '@/layouts/Default';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Hemeroteca = lazy(() => import('./Hemeroteca/'));
const Aulavirtual = lazy(() => import('./Aulavirtual/'));
//const Register = lazy(() => import('./Register'));
export default function Account() {
	return (
		<Routes>
			<Route path="/*" element={<DefaultLayout />}>
				<Route path="hemeroteca" element={<Hemeroteca />} />
				<Route path="aulavirtual" element={<Aulavirtual />} />
			</Route>
		</Routes>
	);
}
