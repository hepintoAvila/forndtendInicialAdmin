// Interfaces
export interface User {
  login: string;
  password: string;
}
export interface Credentials {
  var_login: string;
  password: string;
}
 
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
  idAutorizacion: string;
  menu: string;
  submenu: string;
}

export interface Menu {
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
}

// Tipos de Datos
export type UserList = User[];

// Respuestas de API
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
export interface MenuItem {
  key: string;
  label: string;
  isTitle: boolean;
  icon: string;
  entidad: string;
  badge: {
    variant: string;
    text: number;
  };
  children: MenuItemChild[];
}
export interface MenuItemChild {
  key: string;
  label: string;
}
 export interface UserServiceResponse {
  message?: string;
  status: 'success' | 'error';
  error?: string;
  data?: {
    user: User[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
}
 
export interface AuthServiceInterface {
  Autentications: (values: User) => Promise<AuthServiceResponse>;
}

export interface AuthServiceResponse {
  status: 'success' | 'error';
  data?: {
    auth: AuthData;
    permisos: Permiso[];
    menu: Menu[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  error?: string;
}

export interface UrlObjet {
  accion: string;
  opcion: string;
}

export interface Credentials {
  var_login: string;
  password: string;
}

export interface Params {
  exec: string;
  _SPIP_PAGE: string;
  action: string;
  var_ajax: string;
  bonjour: string;
  accion: string;
  opcion: string;
}