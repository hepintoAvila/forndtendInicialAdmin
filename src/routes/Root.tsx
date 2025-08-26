//import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const Root = () => {
	//const {isAuthenticated, isLoading, error } = useAuth0();
	 
	//console.log('AppRoutes-isAuthenticated',isAuthenticated, isLoading, error );
	const getRootUrl = () => {
		const url = '/dashboard/';
		return url;
	};

	const url = getRootUrl();

	return <Navigate to={`prestaSotf/${url}`} />;
};

export default Root;