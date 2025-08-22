export type UserProps = {
  login?: string;
  password?: string;
  mode?: string;
};

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
export interface AuthServiceInterface {
  Autentications: (values: UserProps) => Promise<AuthServiceResponse>;
}

export type Menu = {
	key: string;
	label: string;
	isTitle?: boolean;
	icon?: string;
	className?: string;
	url?: string;
	badge?: {
		variant: string;
		text: string;
	};
	parentKey?: string;
	target?: string;
	children?: Menu[];

} ; 

export interface MenuItem {
  key: string;
  label: string;
  isTitle: boolean;
  icon: string;
  badge: {
    variant: string;
    text: number;
  };
  children: MenuItemChild[];
}
export interface MenuItemChild {
  key: string;
  label: string;
  // agregar otras propiedades que tengan los hijos del menú
}
// Uso:
// if (hasPermission(permisos, 'Administracion', 'Usuarios', 'add')) {
//   // Mostrar botón de agregar usuario
// }