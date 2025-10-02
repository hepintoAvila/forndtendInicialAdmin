import { config, encodeBasicUrl, useThemeContext } from '@/common';
import AuthService from '@/common/api/auth';
import { useContext, useEffect,useState } from 'react';
import { AuthData, Menu, MenuItem, Permiso } from '../pages/account/Login/type';
import { AuthContext } from '@/common/context/AuthContext';
import Swal from 'sweetalert2';
import UsuarioService from '@/common/api/usuarios';
 export default function useAuth(){
 const deleteCookies = () => {
  const cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    const parts = cookie.split("=");
    const name = parts.shift();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
  });
};
   
 const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
   
  const {setCredentials, clearCredentials } = authContext;

  const { updateMenu } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthData | null>(null);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [MENU_ITEMS_CONTEXT, setMenu] = useState<Menu[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menu, setMenup] = useState<MenuItem[]>([]);
  
  // Verificar autenticación al inicializar
  useEffect(() => {
    checkAuthStatus();   
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
      const savedMenu = localStorage.getItem('userMenu');
        if (savedMenu) {
          updateMenu(menu);
          setMenup(JSON.parse(savedMenu));
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        logout();
      }
    }
    setLoading(false);
  };
  

 
  const login = async (credentialsAuth: any) => {
   
    setLoading(true);
    setError(null);
       const urlObjet = {
        accion: encodeBasicUrl(config.API_ACCION_AUTH),
        opcion: encodeBasicUrl(config.API_OPCION_AUTH),
      };  
  try {
      const authService = AuthService(urlObjet);
      const result = await authService.Autentications(credentialsAuth);

      if (result.status === 'success' && result.data) {
        setUser(result.data.auth);
        //setPermisos(result.data.permisos);
        setMenu(result.data.menu);
        updateMenu(result.data.menu);
         setIsAuthenticated(true);
         setCredentials({
          login: credentialsAuth.login,
          password: credentialsAuth.password})
          
        // Guardar en localStorage
        if (result.data.auth.AppKey) {
          localStorage.setItem('authToken', result.data.auth.AppKey);
        }
        localStorage.setItem('userData', JSON.stringify(result.data.auth));
        localStorage.setItem('userPermisos', JSON.stringify(result.data.permisos));
        localStorage.setItem('userMenu', JSON.stringify(result.data.menu));
        
        const permisos = result.data.permisos.reduce((acc: { [key: string]: Permiso }, permiso) => {
          acc[`${permiso.menu}-${permiso.submenu}`] = permiso;
          return acc;
        }, {});

      setPermisos(permisos as any);
        return result.data;
      } else {
       
        throw new Error(result.error || 'Autenticación fallida');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
const logout = async () => {
		// Simular un delay para operaciones async si es necesario
		await new Promise(resolve => setTimeout(resolve, 100));
		setUser(null);
		setPermisos([]);
		setIsAuthenticated(false);
    clearCredentials();
    setMenu([]);

		localStorage.removeItem('authToken');
		localStorage.removeItem('userData');
		localStorage.removeItem('userPermisos');
		localStorage.removeItem('userMenu');
    deleteCookies();
		// Aquí puedes agregar llamadas a API de logout si es necesario
		// await api.post('/logout');
	};
 // Función para verificar permisos
  const hasPermission = (menuKey: string, submenu: string = '', action: 'query' | 'add' | 'update' | 'delete'): boolean => {
    const permiso = permisos.find(p => p.menu === menuKey && p.submenu === submenu);
    return permiso?.[action] === 'S';
  };

  // Función para verificar acceso a un módulo
  const canAccess = (menuKey: string, submenu: string = ''): boolean => {
    return permisos.some(p => p.menu === menuKey && p.submenu === submenu && p.query === 'S');
  };

  // Función para obtener menú filtrado por permisos
  const getFilteredMenu = (): MenuItem[] => {
    return menu.filter((menuItem: MenuItem) => {
      // Verificar si el usuario tiene acceso al menú principal
      const canAccessMenu = canAccess(menuItem.key);
      
      // Si tiene hijos, filtrarlos también por permisos
      if (menuItem.children && menuItem.children.length > 0) {
        // Crear una copia para no mutar el estado directamente
        const filteredChildren = menuItem.children.filter(child => 
          canAccess(menuItem.key, child.key)
        );
        
        // Retornar un nuevo objeto con los hijos filtrados
        return {
          ...menuItem,
          children: filteredChildren
        };
      }
      
      return canAccessMenu;
    }).filter(menuItem => 
      // Filtrar items que no tienen acceso y no tienen hijos con acceso
      canAccess(menuItem.key) || 
      (menuItem.children && menuItem.children.length > 0)
    );
  };
   const sendPass = async (urlObjet: any) => {
    
      setLoading(true);
      setError(null);
    try {
        
      const userService = UsuarioService(urlObjet);
      const result = await userService.SendData();
  
        if (result.status === 'success' && result.data) {
          return result.data;
        } else {
          throw new Error(result.error || 'Autenticación fallida');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    };
 const handleSubmitPass = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const pass = formData.get('pass');

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas enviar la solicitud?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, enviar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const urlObjet: any = {
        accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
        opcion: encodeBasicUrl(config.API_ADMIN_USUARIOS_ACTUALIZAR_PASS),
        datos: {
          pass,
        },
      };
      sendPass(urlObjet);
    }
  });
};
  
//console.log('menu',menu);     
  return {
    loading,
    error,
    user,
    permisos,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
    MENU_ITEMS_CONTEXT,
    hasPermission,
    canAccess,
    getFilteredMenu,
    handleSubmitPass,
    menu
  };
};