import { ApiResponse, AuthData, AuthServiceInterface, AuthServiceResponse,User } from "./type";
import HttpClient from './httpClient'; // Importa el HttpClient

const httpClient = HttpClient; // Crea una instancia del HttpClient


const AuthService = (urlObjet: any): AuthServiceInterface => {

const Autentications = async (values: User): Promise<AuthServiceResponse> => {
      const credentials = {
      var_login: values.login,
      password: values.password,
    };
    //console.log('Credentials:',  `Basic ${btoa(`${credentials.var_login}:${credentials.password}`)}`);
const token = import.meta.env.VITE_API_TOKEN || '';

const params = new URLSearchParams({
      exec: 'admin_login',
      _SPIP_PAGE: 'admin_login',
      action: 'true',
      var_ajax: 'form',
      bonjour: 'oui',
      accion: urlObjet.accion,
      opcion: urlObjet.opcion
    });

    try {
      const authHeader = {
        headers: {
          'Authorization': `Basic ${btoa(`${credentials.var_login}:${credentials.password}`)}`,
          'x-sices-api-apikey': token ? token : '',
        },
        credentials: 'include'
      };

      const response = await httpClient.post(`/api2025/?${params.toString()}`, authHeader);
      // Verificar si la respuesta está vacía
      if (response.status === 204) {
        return {
          status: 'success',
          data: {
            auth: [] as unknown as AuthData,
            permisos: [],
            menu: [],
            metadata: {
              statusCode: 204,
              type: 'success',
              message: 'No content'
            }
          }
        };
      }

      // `response` is an AxiosResponse; body is in response.data
      const responseData = response.data;
      const metadataStatus = responseData?.metadata?.statusCode ?? response.status;

      if (metadataStatus !== 200) {
            return {
          status: 'error',
          data: {
            auth: [] as unknown as AuthData,
            permisos: [],
            menu: [],
            metadata: {
              statusCode: 500,
              type: 'error',
              message: `HTTP error! status: ${response.status}`
            }
          }
        };
        //throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Obtener el texto de la respuesta primero para debuggear
      // Si response.data ya es string úsalo; si es objeto, convertir a string para debug/parseo consistente
      const responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
     // console.log('Raw response:', responseText);
     // console.log('Raw response:', responseText);
     if (!responseText) {
        console.log('La respuesta está vacía');
        // Puedes manejar este caso según tus necesidades
          throw new Error('La respuesta está vacía');
      }
      // Intentar parsear como JSON
      let result:  ApiResponse;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', responseText);
        throw new Error('La respuesta no es un JSON válido');
        
      }

      // Verificar la estructura de la respuesta
      if (result.status === 200 && result.type === 'success') {
        // Retornar los datos estructurados
        return {
          status: 'success',
          data: {
            auth: result.data?.Auth || [],
            permisos: result.data?.Permisos || [],
            menu: result.data?.Menu || [],
            metadata: {
              statusCode: result.status,
              type: result.type,
              message: result.message
            }
          }
        };
      } else {
        
        throw new Error(result.message || 'Error en la autenticación');
        
      }
      
      // If the code reaches here, return a default error response
    
    } catch (error) {
      console.error('Auth error:', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Error de autenticación desconocido'
      };
    }
  };

  return {
    Autentications
  };
};

export default AuthService;