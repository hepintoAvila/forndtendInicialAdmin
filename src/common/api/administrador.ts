import { config, getUserFromSession } from '../helpers';
 
interface ServiceInterface {
	Save: (values: any) => Promise<any>;
  send: (values: any) => Promise<any>;
 
}

interface ErrorCodeMessages {
  [key: number]: string;
}
 
const ErrorCodeMessages: ErrorCodeMessages = {
  401: 'Invalid credentials',
  403: 'Access Forbidden',
  404: 'Resource or page not found',
};

const AdministradorService = (url: string): ServiceInterface => {

  const Save = async (data: any) => {
    const user = getUserFromSession()
    try {
      
      const response = await fetch(`${config.API_URL}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'X-SICES-API-Apikey': btoa(user.Apikey),
          'X-SICES-API-ApiToken': btoa(user.ApiToken),
          'X-SICES-API-USER': btoa(user.Usuario),
          'Content-Type': 'application/json',
        },
      });
	    if (!response.ok) {
        throw new Error(ErrorCodeMessages[response.status] || 'Unknown error');
      }
	 
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         return response.json();
      } else {
        const text = await response.text();
        throw new Error(`La respuesta no es JSON válida: ${text}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }; 
 
  const send = async (data: any) => {
    try {
      
      const response = await fetch(`${config.API_URL}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
           Authorization: `Basic ${btoa(`${config.X_SICES_API_USER}:${config.X_SICES_API_PASS}`)}`,
	        'X-SICES-API-USER': btoa(`${config.X_SICES_API_USER}`),
	        'X-SICES-API-Apikey': btoa(`${config.X_SICES_API_APIKEY_USER}`),
	        'X-SICES-API-ApiToken': btoa(`${config.X_SICES_API_APITOKEN_USER}`),
          'Content-Type': 'application/json',
        },
      });
	    if (!response.ok) {
        throw new Error(ErrorCodeMessages[response.status] || 'Unknown error');
      }
	 
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         return response.json();
      } else {
        const text = await response.text();
        throw new Error(`La respuesta no es JSON válida: ${text}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { Save,send};
};

export default AdministradorService;