//import { LoginFormFields } from '@/pages/account/Login/useLogin';
import { config } from '../helpers';
type UserProps = {
  login?: string ;
  password?: string;
  mode?: string;
};

interface AuthServiceInterface {
	Autentications: (values: UserProps) => Promise<Response>;
}

interface ErrorCodeMessages {
  [key: number]: string;
}

const ErrorCodeMessages: ErrorCodeMessages = {
  401: 'Invalid credentials',
  403: 'Access Forbidden',
  404: 'Resource or page not found',
};

const AuthService = (url: string): AuthServiceInterface => {

  const Autentications = async (values: UserProps) => {
    const credentials = {
      var_login: values.login,
      password: values.password,
    };
    const mode = values.mode? values.mode:'uselocal';
     const headers = {
	   method: 'GET',
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${credentials.var_login}:${credentials.password}`)}`,
	    'x-sices-api-user': btoa(`${credentials.var_login}`),
	    'x-sices-api-apikey': btoa(`${config.X_SICES_API_APIKEY}`),
	    'x-sices-api-apitoken': btoa(`${config.X_SICES_API_APITOKEN}`),
	    'x-sices-api-mode': btoa(`${mode}`),
    }; 

    try {
      const response = await fetch(`${config.API_URL}${url}`, { headers });

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

  return { Autentications };
};

export default AuthService;