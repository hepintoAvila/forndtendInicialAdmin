//import config from "../helpers/config";
import { Credentials } from "@/pages/Reportes/type";
import { ApiResponse, AuthServiceInterface, AuthServiceResponse, EmailRequest } from "../type/type_loginemail";
 

const LoginAuth0Service = (urlObjet: EmailRequest, bodyData: any): AuthServiceInterface => {
  const Autentications = async (): Promise<AuthServiceResponse> => {

const credentials:Credentials  = {
 var_login: import.meta.env.VITE_API_USERNAME,
  password: import.meta.env.VITE_API_PASSWORD,
};
    const token = import.meta.env.VITE_API_PASSWORD_APIKEY;
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
     
      const response = await fetch(`/api2025/?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${credentials.var_login}:${credentials.password}`)}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'x-sices-api-apikey': token ? token : '',
        },
         body: JSON.stringify(bodyData),
        credentials: 'include'
      });

      // Verificar si la respuesta está vacía
      if (response.status === 204) {
        return {
          status: 'success',
          data: {
          auth:[],
          permisos:[],
          menu: [],
            metadata: {
              statusCode: 204,
              type: 'success',
              message: 'No content'
            }
          }
        };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Obtener el texto de la respuesta primero para debuggear
      const responseText = await response.text();
     // console.log('Raw response:', responseText);
      if (!responseText) {
        console.log('La respuesta está vacía');
        // Puedes manejar este caso según tus necesidades
        throw new Error('La respuesta está vacía');
      }
      // Intentar parsear como JSON
      let result: ApiResponse;
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
            auth: result.data?.Auth ? [result.data.Auth] : [],
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

    } catch (error) {
      if (error instanceof Error && error.message.includes('No existen registros de Turno')) {
        return {
          status: 'success',
          data: {
            auth: [],
            permisos: [],
            menu: [],
            metadata: {
              statusCode: 200,
              type: 'success',
              message: 'No existen registros de Turno'
            }
          }
        };
      }
    console.error('Auth error:', error);
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Error de autenticación desconocido'
    };
  }
  };
  return {
    Autentications,
  };
};

export default LoginAuth0Service;