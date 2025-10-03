
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface SendEmail  {
    email: string;
}
export interface User  {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

export type UserList = User [];

export interface UserData {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}
export interface ApiUserResponse {
  status: number;
  type: string;
  message: string;
  data: {
    user: UserData[];
  };
}
export interface AuthData {
  AppKey: string;
}

export type UserRequestDatos = {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
};

export type EmailRequest = {
  accion: string;
  opcion: string;
};
export interface BodyData {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

export interface UserServiceResponse {
  message?: string; 
  status: 'success' | 'error';
  error?: string;
  data?: {
    user: UserData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  
}

export interface UserServiceInterface {
  Autentications: () => Promise<UserServiceResponse>;
}
interface UserResp {
   nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

interface UserResponseData {
  User: UserResp[];
}

export interface ApiUserResponseData {
  status: number;
  type: string;
  data: UserResponseData;
  message?: string;
}

export type Menu = {
	key: string;
	label: string;
	isTitle?: boolean;
	icon?: string;
	className?: string;
	entidad?: string;
	url?: string;
	badge?: {
		variant: string;
		text: string;
	};
	parentKey?: string;
	target?: string;
	children?: Menu[];

} ; 

export interface AuthData {
  Nom: string;
  Email: string;
  Rol: string;
  status: string;
  AppKey: string;
}

export interface Permiso {
  query: string;
  add: string;
  update: string;
  delete: string;
  id_autorizacion: string;
  menu: string;
  submenu: string;
}

export interface ApiResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Auth: AuthData;
    Permisos: Permiso[];
    Menu: Menu[];
  };
}
export interface AuthServiceResponse {
  message?: string; 
  status: 'success' | 'error';
  error?: string;
  data?: {
    auth: AuthData[];
    permisos: Permiso[];
    menu: Menu[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  
}
export interface AuthServiceInterface {
  Autentications: (params?: any) => Promise<AuthServiceResponse>;
}