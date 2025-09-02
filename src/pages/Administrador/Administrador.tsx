 
import { lazy } from 'react';
import {Outlet,Route, Routes } from 'react-router-dom';
const Roles = lazy(() => import('./Roles/Roles'));
  const CRM = lazy(() => import('../Reportes/'));



export default function Administrador() {
	return (
	<Routes>
	  <Route path="/*" element={<Outlet />}>
		<Route
		  path="Roles/*"
		  element={<Roles/>}
		/>
	  </Route>
	 <Route path="reportes" element={<CRM />} />
	</Routes>
		
	);
}
