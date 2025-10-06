import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const Root = () => {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();

  if (error && error.message.includes('Invalid state')) {
    loginWithRedirect();
    return null;
  }

  if (error) {
    return <div>Error Root: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const url = isAuthenticated ? '/aula/mobile' : '/aula/login';

  return <Navigate to={url} />;
};

export default Root;