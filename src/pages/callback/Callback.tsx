//import { useEffect, useState } from 'react';
//import { useAuth0 } from '@auth0/auth0-react';
//import useLogin from '@/pages/account/Login/useLogin';
const Callback = () => {

	/*
		const {login } = useLogin();
	//const { user, isAuthenticated, getAccessTokenSilently, isLoading, error } = useAuth0();
	const [permissions] = useState([]);
	useEffect(() => {
	  const fetchPermissions = async () => {
		try {
		  //const token = await getAccessTokenSilently();
		  //const formData={login:user?.email,password:user?.nickname}
		 // login(formData)
			console.log('Callback-token',token)
		} catch (error) {
		  console.error('Error fetching permissions:', error);
		}
	  };
	
	  if (isAuthenticated) {
			try {
				fetchPermissions()
				  console.log('Callback-isAuthenticated', isAuthenticated, isLoading, error);
			  } catch (error) {
				console.error('Error fetching permissions:', error);
			  }
	  }
	}, [isAuthenticated, getAccessTokenSilently]);
	
	console.log('isAuthenticated-Callback',isAuthenticated)
	console.log('token',user,permissions)
	console.log('Callback-window.location.origin', window.location.origin)
*/
  return (
    <div>
      {/*isAuthenticated ? (
        <div>Error de autenticación: {isAuthenticated}</div>
      ) : (
        <div>Autenticando...</div>
      )*/}
    </div>
  );
};

export {Callback};