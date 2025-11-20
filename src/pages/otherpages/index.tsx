import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const Error404Alt = lazy(() => import('./Error404Alt'));


export default function OtherPages() {
	return (
		<Routes>
			<Route path="/*" element={<Outlet />}>
				<Route path="404-alt" element={<Error404Alt />} />
			</Route>
		</Routes>
	);
}
