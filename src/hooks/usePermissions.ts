// hooks/usePermissions.ts
import { MenuItem, MenuItemChild } from '@/pages/account/Login/type';
import useAuth from './useAuth';
 

export default function usePermissions() {
  const { permisos, menu } = useAuth();
const uniqueMenu = menu.filter((menuItem, index, self) => 
  index === self.findIndex((t) => t.key === menuItem.key)
);
  const hasPermission = (
    menuKey: string, 
    submenu: string = '', 
    action: 'query' | 'add' | 'update' | 'delete'
  ): boolean => {
    const permiso = permisos.find(p => p.menu === menuKey && p.submenu === submenu);
    return permiso?.[action] === 'S';
  };

  const canAccess = (menuKey: string, submenu: string = ''): boolean => {
    return permisos.some(p => p.menu === menuKey && p.submenu === submenu && p.query === 'S');
  };

const getFilteredMenu = (): MenuItem[] => {
  if (!uniqueMenu || !Array.isArray(uniqueMenu)) {
    return [];
  }
  return uniqueMenu.map((menuItem: MenuItem) => {
    const filteredChildren = menuItem.children.filter((child: MenuItemChild) => 
      hasPermission(menuItem.key, child.key, 'query')
    );
    return {
      ...menuItem,
      children: filteredChildren
    };
  }).filter(item => item.children.length == 0);
};
  return {
    hasPermission,
    canAccess,
    getFilteredMenu,
    permisos,
    uniqueMenu
  };
};