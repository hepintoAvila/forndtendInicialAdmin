import { AuthContext } from '@/common/context/AuthContext';
import { useContext, useEffect, useState, useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { config, encodeBasicUrl, useNotificationContext } from '@/common';
import { AuthServiceResponse, EmailRequest } from '@/common/type/type_loginemail';
import LoginAuth0Service from '@/common/api/login_auth0';

interface BodyDataEmail {
  email: string;
}
interface BodyDataDocumento {
  documento: number;
}
interface Usuario {
  documento: string;
  rol: string;
  programa: string;
  email: string;
}
type Ubicacion = 'Aula Virtual-Virtualteca' | 'Hemeroteca'; // Agrega más ubicaciones según sea necesario

type Motivo = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'; // Agrega más motivos según sea necesario

type Visita = {
    ubicacion: Ubicacion;
    motivo: Motivo;
    pc: string;
    email: string;
};
const ApiEstudianteAtom = atom<AuthServiceResponse>({
    message: '', 
    status: 'success',
    error: '',
    data: {
      auth: [],
      permisos: [],
      menu: [],
      metadata: {
        statusCode: 0,
        type: '',
        message: '',
      }
    }
});

export default function useLoginEmail() {
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

  const generateBodyDataEmail = useCallback((email: string): BodyDataEmail => {
    return { email };
  }, []);
  const generateBodyDataDocument = useCallback((documento: number): BodyDataDocumento => {
    return { documento };
  }, []);

const generateBodyPersonales = useCallback((dataBody: any): Usuario => {
  const datos = dataBody.datos;
  return {
    documento: datos.documento ? datos.documento.toString() : '',
    rol: datos.rol,
    programa: datos.programa,
    email: datos.email,
  };
}, []);
const generateBodySolicitud = useCallback((dataBody: any): Visita => {
  const datos = dataBody;
  return {
    ubicacion: datos.ubicacion,
    motivo: datos.motivo,
    pc: datos.pc,
    email: datos.email,
  };
}, []);
  const sendRequest = useCallback(async (urlObjet: any, bodyData: any) => {
    setLoading(true);
    setError(null);
    try {
      const loginaoth0Service = LoginAuth0Service(urlObjet, bodyData);
      const result = await loginaoth0Service.Autentications();
      if (result.status === 'success' && result.data) {
        setIsAuthenticated(true);
        setEsctudiantes({
          message: result.message,
          status: result.status,
          error: '',
          data: {
            auth: result.data.auth,
            permisos: result.data.permisos,
            menu: result.data.menu,
            metadata: {
              statusCode: result.data.metadata.statusCode,
              type: result.data.metadata.type,
              message: result.data.metadata.message,
            }
          }
        });
        setMessage(result.message as unknown as string);
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
  }, [setEsctudiantes, showNotification]);

  const handleSubmitEmail = useCallback((email: string) => {
    const credentialsUrl: EmailRequest = {
      accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
      opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_LOGIN_AUTH0),
    };
    const bodyData = generateBodyDataEmail(email);
    sendRequest(credentialsUrl, bodyData);
  }, [generateBodyDataEmail, sendRequest]);

  const sendDatosPersonales = useCallback((urlObjet: any, dataBody: any) => {
    const bodyDatos = generateBodyPersonales(dataBody);
    sendRequest(urlObjet, bodyDatos);
  }, [generateBodyPersonales, sendRequest]);
  
  
  const handleSubmitSolicitud = useCallback((value: Visita) => {
    const credentialsUrl: EmailRequest = {
      accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
      opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_LOGIN_AUTH0_SOLICITUD),
    };
    const bodyData = generateBodySolicitud(value);
    sendRequest(credentialsUrl, bodyData);
    
  }, [generateBodyDataEmail, sendRequest]);


  const handleSubmitSolicitudDocumento = useCallback((value: BodyDataDocumento) => {
    const credentialsUrl: EmailRequest = {
      accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
      opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_LOGIN_DOCUMENTO_SOLICITUD),
    };
    const bodyData = generateBodyDataDocument(value as unknown as number);
    sendRequest(credentialsUrl, bodyData);
    
  }, [generateBodyDataDocument, sendRequest]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
//console.log('usuario', usuario);
  return {
    loading,
    error,
    isAuthenticated,
    usuario,
    handleSubmitEmail,
    sendDatosPersonales,
    handleSubmitSolicitud,
    handleSubmitSolicitudDocumento,
  };
}