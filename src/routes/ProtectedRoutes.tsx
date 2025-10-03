import { ThemeSettings, useThemeContext } from '@/common';
import { lazy } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import VerticalLayout from '@/layouts/Vertical';
import HorizontalLayout from '@/layouts/Horizontal';
import Root from './Root';
 
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks';
 
const Error404Alt = lazy(() => import('../pages/otherpages/Error404Alt'));
const Aula = lazy(() => import('../pages/Aula/'));

export default function ProtectedRoutes() {
  const { settings } = useThemeContext();
  const Layout = settings.layout.type == ThemeSettings.layout.type.vertical
    ? VerticalLayout
    : HorizontalLayout;
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <ReactRoutes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="aula/*" element={<Aula />} />
        <Route path="*" element={<Error404Alt />} />
      </Route>
    </ReactRoutes>
  );
}

