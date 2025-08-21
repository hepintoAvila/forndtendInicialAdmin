

//import { useAuth0 } from '@auth0/auth0-react';
//import { useEffect } from 'react';
//import useLogin from '@/pages/account/Login/useLogin';
import { useAuthContext } from '@/common';
import { Bienvenido, RecoverPassword } from './storeSotf';
import { Col, Row } from 'react-bootstrap';
import useLogin from './account/Login/useLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
 
const Dashboard = () => {
	sessionStorage.removeItem('logoutRedirectPath');
	const {datosUser} = useAuthContext();
	const { 
		isAuthenticated,
		setLoading
		  } = useLogin();
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
	  
		  const hasRedirected = useRef(false);
		 
		  useEffect(() => {
			if (isAuthenticated.isAuthenticated && !hasRedirected.current) {
			  hasRedirected.current = true;
			  navigate('/account/logout', { replace: true });
			}
		  }, [isAuthenticated, navigate]);
	return  (
        <>
          {(() => {
            switch (auth.status) {
              case 'Inactivo':
                return  <> 
				<Row>
				<Col lg={12} >
                <RecoverPassword/>
				</Col>
				</Row> </> 
				case 'Activo':
					return (
						<>
						<Bienvenido datosUser={datosUser}/>
						</>)
				default:
                return (
                  <>
                { navigate('/account/logout', { replace: true })};
                  </>
                );
            }
          })()}
        </>
      );
};

export default  Dashboard ;
