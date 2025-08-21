import { useAuthContext, useNotificationContext } from '@/common/context';
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import AuthService from '@/common/api/auth';
import { encodeBasicUrl } from '@/common';


import { config } from '@/common/helpers/';
import { AuthResponse } from '@/types';
import { atom, useAtom } from 'jotai';
import AdministradorService from '@/common/api/administrador';
//import { UsuarioActualiza } from '@/Atoms/profesionales';
 
export const Mensajes = atom<any>();
export const loginFormSchema = yup.object({
  login: yup.string().required('Please enter login'),
  password: yup.string().required('Please enter password'),
});

export type LoginFormFields = yup.InferType<typeof loginFormSchema>;

interface ErrorCodeMessages {
  [key: number]: string;
}
interface CodeMessages {
  [key: number]: string;
}
const ErrorCodeMessages: ErrorCodeMessages = {
  401: 'Usuario o Password incorrectos',
  403: 'Access Forbidden',
  404: 'Resource or page not found',
};

const CodeMessages: CodeMessages = {
  1003: 'email no tiene el formato de correo',
  1002: 'NO SE PUDO REGISTRAR EL USUARIO',
  1004: 'Lo sentimos, no puedes presentar la prueba, usaste todas las oportunidades.',
  1005: '::OK:: Respuesta guardadas!',
  1006: 'Buscando registros de aspirante...',
  1007: 'Puedes hacer clic en el boton Presentar Prueba',
  1008: 'El correo electrónico ingresado ya está registrado en nuestro sistema. Por favor, utilice una dirección diferente o inicie sesión si ya tiene una cuenta',
};

type UserProps = {
  login?: string;
  password?: string;
  mode?: string;
};


const useLogin = () => {


  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  //const [setPass] = useAtom(UsuarioActualiza);
  const { isAuthenticated, saveSession, saveMenus } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const redirectUrl = useMemo(() => location.state?.from?.pathname || '/', [location.state]);
  const [message, setItemsMessage] = useAtom(Mensajes);
  
   const login = async (values: UserProps) => {
    setLoading(true);
    try {
      const url = `&accion=${encodeBasicUrl(config.API_ACCION_AUTH)}&opcion=${encodeBasicUrl(config.API_OPCION_AUTH)}&bonjour=oui`;
      const authApi = AuthService(url);
      const response:any = await authApi.Autentications(values);
   
      if (response?.status == 202) {
        const data = await authApi.Autentications(values) as unknown as AuthResponse;

        if (data?.data?.Auth) {
          const objAuth = {
            Nom: data?.data?.Auth?.Nom,
            Idsuario: data?.data?.Auth?.Idsuario,
            Usuario: data?.data?.Auth?.Usuario,
            Email: data?.data?.Auth?.Email,
            Rol: data?.data?.Auth?.Rol,
            Apikey: data?.data?.Auth?.AppKey,
            ApiToken: data?.data?.Auth?.AppToken,
            entidad: data?.data?.Auth?.entidad,
            status: data?.data?.Auth?.status,
          }
          const Menu = data?.data?.Menus
          saveSession({ ...objAuth })
          saveMenus(Menu)
          navigate(redirectUrl);


            } else {
              showNotification({ message: 'No token provided', type: 'error' });
              navigate(redirectUrl);
            }

      } else {
        
        const errorCode = response?.data?.status;
     console.log('errorCode',errorCode);
        const errorMessage = ErrorCodeMessages[errorCode] || 'Unknown error';
        showNotification({ message: errorMessage, type: 'error' });
      }
    } catch (error: any) {
      showNotification({ message: error.toString(), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = useCallback(async (formData: any, opcion: string) => {
    try {
      const url = `&accion=${encodeBasicUrl(config.API_ACCION_USUARIOS)}&opcion=${encodeBasicUrl(opcion)}&bonjour=oui`;
      const profesionalApi = AdministradorService(url);
      const response = await profesionalApi.Save(formData);
      //console.log('opcion-recoverPassword',opcion)
      if (response?.status === 202) {
        setTimeout(function () {
          showNotification({ message: response?.message, type: 'success' });
          //setPass(response?.data?.Usuarios);
          navigate(redirectUrl);
        }, 1000);
      } else {
        const errorCode = response.status;
        const errorMessage = ErrorCodeMessages[errorCode] || 'Registra tus datos personales para presentar la prueba';
        showNotification({ message: errorMessage, type: 'error' });
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }, []);

  return {
    loading,
    login,
    recoverPassword,
    setLoading,
    redirectUrl,
    isAuthenticated,
    message, 
  };
};

export default useLogin;