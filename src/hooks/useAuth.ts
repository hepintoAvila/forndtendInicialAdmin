import { config, encodeBasicUrl } from '@/common';
import AuthService from '@/common/api/auth';
import { useEffect,useState } from 'react';
import { AuthData, Menu, MenuItem, Permiso } from '../pages/account/Login/type';

export default function useAuth(){

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
        setUser(JSON.parse(userData));
        const savedPermisos = localStorage.getItem('userPermisos');
        if (savedPermisos) {
          setPermisos(JSON.parse(savedPermisos));
        }
      const savedMenu = localStorage.getItem('userMenu');
        if (savedMenu) {
          setMenu(JSON.parse(savedMenu));
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

 
  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
       const urlObjet = {
        accion: encodeBasicUrl(config.API_ACCION_AUTH),
        opcion: encodeBasicUrl(config.API_OPCION_AUTH),
      };  
  try {
      const authService = AuthService(urlObjet);
      const result = await authService.Autentications(credentials);

      if (result.status === 'success' && result.data) {
        setUser(result.data.auth);
        setPermisos(result.data.permisos);
        setMenu(result.data.menu);
         setIsAuthenticated(true);
        // Guardar en localStorage
        if (result.data.auth.AppKey) {
          localStorage.setItem('authToken', result.data.auth.AppKey);
        }
        localStorage.setItem('userData', JSON.stringify(result.data.auth));
        localStorage.setItem('userPermisos', JSON.stringify(result.data.permisos));
        localStorage.setItem('userMenu', JSON.stringify(result.data.menu));
        
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
		localStorage.removeItem('authToken');
		localStorage.removeItem('userData');
		localStorage.removeItem('userPermisos');
		localStorage.removeItem('userMenu');
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
    menu
  };
};