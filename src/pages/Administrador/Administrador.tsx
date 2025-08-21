 
import { lazy } from 'react';
import {Outlet,Route, Routes } from 'react-router-dom';
const Usuarios = lazy(() => import('./Usuarios/Usuarios'));
 
  const Roles = lazy(() => import('./Roles/Roles'));
 



export default function Administrador() {
	return (
	<Routes>
	  <Route path="/*" element={<Outlet />}>
		<Route
		  path="Roles/*"
		  element={<Roles/>}
		/>
		 <Route
		  path="Usuarios/*"
		  element={<Usuarios/>}
		/>
	  </Route>
	</Routes>
		
	);
}
