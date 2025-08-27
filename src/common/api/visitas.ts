import { ApiVisitaResponse, UserProps, VisitaServiceInterface, VisitaServiceResponse } from "../type/type._visitas";


const VisitaService = (urlObjet: any,bodyData:any): VisitaServiceInterface => {

  const Autentications = async (values: UserProps): Promise<VisitaServiceResponse> => {
     if (!values) {
     throw new Error('values para AuthContext  no está disponible');
    }

    const credentials = {
      var_login: values.login,
      password: values.password,
    };
    const token = localStorage.getItem('authToken');
    const params = new URLSearchParams({
      exec: 'admin_visitas',
      _SPIP_PAGE: urlObjet._SPIP_PAGE || 'admin_visitas',
      action: urlObjet.action || 'true',
      var_ajax:  urlObjet.var_ajax || 'form',
      bonjour: urlObjet.bonjour || 'oui',
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
            visitas: [],
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
      let result: ApiVisitaResponse;
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
            //auth: result.data?.Auth || {} as AuthData,
            visitas: result.data?.Visitas || [],
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
      if (error instanceof Error && error.message.includes('No existen registros de Pcs')) {
        return {
          status: 'success',
          data: {
            visitas: [],
            metadata: {
              statusCode: 200,
              type: 'success',
              message: 'No existen registros de Pcs'
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
    Autentications
  };
};

export default VisitaService;

 
