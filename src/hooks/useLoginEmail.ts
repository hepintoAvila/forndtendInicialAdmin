import { AuthContext } from '@/common/context/AuthContext';
import { useContext, useState } from 'react';
 import { atom, useAtom } from 'jotai';
import { config, encodeBasicUrl, useNotificationContext } from '@/common';

 
import { EmailRequest, SendEmail } from '@/common/type/type_loginemail';
import LoginAuth0Service from '@/common/api/login_auth0';
import { EstudianteServiceResponse } from '@/pages/Aula/Aulavirtual/typeEstudiante';

        interface BodyDataEmail {
              email?: string | undefined ;

      }
const ApiEstudianteAtom = atom<EstudianteServiceResponse>([] as unknown as EstudianteServiceResponse);

export default function useLoginEmail(){
    const generateBodyDataEmail = (urlObjet: {  datos?: {email: string | undefined }} ): BodyDataEmail => {
      const bodyData: BodyDataEmail = {email:''};
     if (urlObjet.datos) {
      bodyData.email = urlObjet.datos.email;
    }
      return bodyData;
    };

const { showNotification } = useNotificationContext();
const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setEsctudiantes] = useAtom(ApiEstudianteAtom);
  const [message, setMessage] = useState('');

 const sendEmail = async (urlObjet: EmailRequest,dataBody:SendEmail) => {
    setLoading(true);
    setError(null);
  try {
      
      const loginaoth0Service = LoginAuth0Service(urlObjet,dataBody);
      const result = await loginaoth0Service.Autentications();
      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setEsctudiantes(result.data.auth  as unknown as  EstudianteServiceResponse);
         const message = result.message  as unknown as string;
          
         setMessage(message);
          showNotification({ message: '', type: 'loading' });
        return result.data;
      } else {
        throw new Error(result.error || 'Autenticación fallida');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  const handleSubmitEmail = (email:string) => {

      const credentialsUrl: EmailRequest = {
          accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
          opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_LOGIN_AUTH0),
        };
          const urlObjet: any ={
            datos: {
                email
              }
          }
          //console.log('urlObjet',urlObjet);
          const bodyData = generateBodyDataEmail(urlObjet);
          sendEmail(credentialsUrl, bodyData as any);
    };
 console.log('message',message);
  return {
    loading,
    error,
    isAuthenticated,
    usuario,
    handleSubmitEmail,
  };
};