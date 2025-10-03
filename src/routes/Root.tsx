import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
const getRootUrl = (isAuthenticated: boolean) => {
    let urlBase = '';
    let url = '';
    if (!isAuthenticated) {
        url = 'login';
        urlBase = 'aula';
    } else {
        url = 'mobile';
        urlBase = 'aula';
    }
    return { url, urlBase };
};
const Root = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return <div>Cargando...</div>; // o un componente de carga
    }

    const { url, urlBase } = getRootUrl(isAuthenticated);
    if (url && urlBase) {

        return <Navigate to={`${urlBase}/${url}`} />;
        
    } else {
        if (error) {
        // Puedes manejar el error de alguna manera, por ejemplo:
        return <div>Error_1: {error.message}</div>;
        }
        
    }
};

export default Root;
