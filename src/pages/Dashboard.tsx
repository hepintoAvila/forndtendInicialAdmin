

//import { useAuth0 } from '@auth0/auth0-react';
//import { useEffect } from 'react';
//import useAuth from '@/pages/account/Login/useAuth';
 
import { Bienvenido, RecoverPassword } from './storeSotf';
import { Col, Row } from 'react-bootstrap';
 
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from './account/Login/useLogin';
 
const Dashboard = () => {
	sessionStorage.removeItem('logoutRedirectPath');
	const { isAuthenticated} = useAuth();
	console.log('isAuthenticated',isAuthenticated);
		    /*
	const navigate = useNavigate();
		useEffect(() => {
			const handleBeforeUnload = (event:any) => {
			  event.preventDefault();
			  sessionStorage.clear(); 
			  navigate('/account/Logout', { replace: true });
			};
			window.addEventListener('beforeunload', handleBeforeUnload);
			return () => {
			  window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		  }, [navigate]);
	
		  const auth = JSON.parse(sessionStorage.getItem('_AUTH') || '{}');
		  const idUsuario = auth?.Idsuario ? parseInt(auth.Idsuario, 10) : NaN;
		
		  useEffect(() => {
			if (!isNaN(idUsuario)) {
			  setLoading(true);
			} else {
			  setLoading(false);
			 
			}
		  }, [idUsuario, setLoading]);
	  */ /*
		  const hasRedirected = useRef(false);
		
		  useEffect(() => {
			if (isAuthenticated.isAuthenticated && !hasRedirected.current) {
			  hasRedirected.current = true;
			  navigate('/account/logout', { replace: true });
			}
		  }, [isAuthenticated, navigate]);
		  console.log(auth);
		  */

	return  (
        <>
          {'xxxxxxxxxxxx'}
        </>
      );
};

export default  Dashboard ;
