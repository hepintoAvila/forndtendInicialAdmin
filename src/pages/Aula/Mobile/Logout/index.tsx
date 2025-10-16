import { useEffect, useState } from 'react';
import LogoutWrapper from '../Components/LoginEstudiante/LogoutWrapper';
import SocialLogout from '../Components/SocialLogout';
 
 
const Logout = () => {
    const [redirect] = useState(false);
    useEffect(() => {
        if (redirect) {
            setTimeout(() => {
						localStorage.removeItem('authToken');
						localStorage.removeItem('userData');
						localStorage.removeItem('userPermisos');
						localStorage.removeItem('userMenu');
						localStorage.removeItem('Aulas');
						localStorage.removeItem('Prestamos');
       

            }, 2000); // 2 segundos después de mostrar el mensaje
        }
    }, [redirect]);
    return (
        <>
        
            <LogoutWrapper bottomLinks={<SocialLogout />} >

            </LogoutWrapper>
             
        </>
    );
};

export default Logout;
