import { ApiResponse,PcsServiceInterface, PcsServiceResponse, UserProps } from "@/pages/Aula/Aulavirtual/type";

 
 
const PcsService = (urlObjet: any): PcsServiceInterface => {

  const Autentications = async (values: UserProps): Promise<PcsServiceResponse> => {
    
    console.log('values:', values);
    const credentials = {
      var_login: values.login,
      password: values.password,
    };
    const token = localStorage.getItem('authToken');
    const params = new URLSearchParams({
      exec: urlObjet.accion || 'admin_pcs',
      _SPIP_PAGE: urlObjet._SPIP_PAGE || 'admin_login',
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
        credentials: 'include'
      });

      // Verificar si la respuesta está vacía
      if (response.status === 204) {
        return {
          status: 'success',
          data: {
            //auth: {} as AuthData,
            pcs: [],
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
            //auth: result.data?.Auth || {} as AuthData,
            pcs: result.data?.Pcs || [],
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

export default PcsService;