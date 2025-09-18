import { config, encodeBasicUrl, useNotificationContext } from '@/common';
import { useContext,useState } from 'react';
import { AuthContext } from '@/common/context/AuthContext';
import Swal from 'sweetalert2';
import UsuarioService from '@/common/api/usuarios';
import { Credentials } from '@/pages/Aula/Aulavirtual/typeEstudiante';
import useLogout from './useLogout';
 
export default function useUsuarios(){
 
 const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotificationContext();
  const logout = useLogout();

   const sendPass = async (urlObjet: any) => {
    
      setLoading(true);
      setError(null);
    try {
      const userService = UsuarioService(urlObjet);
      const result = await userService.SendData(credentials as Credentials);
  
        if (result.status === 'success' && result.data) {
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
        showNotification({ message: '', type: 'loading' });
        logout();
      }
    };
 const handleSubmitPass = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const pass = formData.get('pass');

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas enviar la solicitud?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, enviar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const urlObjet: any = {
        accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
        opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_ACTUALIZAR_PASS),
        datos: {
          pass,
        },
      };
      sendPass(urlObjet);
    }
  });
};
  
   
  return {
    loading,
    error,
    handleSubmitPass,
  };
};