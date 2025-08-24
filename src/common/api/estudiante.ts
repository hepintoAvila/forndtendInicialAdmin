import { ApiEstudianteResponse, EstudianteServiceInterface, EstudianteServiceResponse, UserProps } from "@/pages/Aula/Aulavirtual/typeEstudiante";

const EstudianteService = (urlObjet : any): EstudianteServiceInterface => {

const Autentications = async (values: UserProps): Promise<EstudianteServiceResponse> => {
const credentials = {
      var_login: values.login,
      password: values.password,
    };
    const token = localStorage.getItem('authToken');
    const params = new URLSearchParams({
      exec: urlObjet._SPIP_PAGE || 'admin_usuarios',
      _SPIP_PAGE: urlObjet._SPIP_PAGE || 'admin_usuarios',
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
        body: JSON.stringify({
         documento: urlObjet.documento,
      }),
        credentials: 'include'
      });

      // Verificar si la respuesta está vacía
      if (response.status === 204) {
        return {
          status: 'success',
          data: {
            estudiantes: [],
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
      let result: ApiEstudianteResponse;
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
            estudiantes: result.data?.Estudiantes || [],
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
      if (error instanceof Error && error.message.includes('No existen registros de Estudiantes')) {
        return {
          status: 'success',
          data: {
            estudiantes: [],
            metadata: {
              statusCode: 200,
              type: 'success',
              message: 'No existen registros de Estudiantes'
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

export default EstudianteService;