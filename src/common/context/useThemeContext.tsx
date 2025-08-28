import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import i18n, { isValidLanguage, Languages } from '@/common/languages/i18n';
import { menuAtoms } from '@/Atoms/menu';
import { useAtom } from 'jotai';
import { MenuItem } from '@/pages/account/Login/type';
 
const ThemeContext = createContext<any>({});
const objMenu = JSON.parse(sessionStorage.getItem('_MENU') || '{}');

export const ThemeSettings = {
	layout: {
		type: { vertical: 'vertical', horizontal: 'horizontal' },
		mode: { fluid: 'fluid', boxed: 'boxed', detached: 'detached' },
		menuPosition: { scrollable: 'scrollable', fixed: 'fixed' },
	},
	theme: { light: 'light', dark: 'dark' },
	topbar: {
		theme: { light: 'light', dark: 'dark', brand: 'brand' },
		logo: { hidden: 'fullscreen', show: '' },
	},
	sidebar: {
		theme: { light: 'light', dark: 'dark', brand: 'brand' },
		size: {
			default: 'default',
			compact: 'compact',
			condensed: 'condensed',
			showOnHover: 'sm-hover',
			full: 'full',
			fullscreen: 'fullscreen',
		},
		user: { show: true, hidden: false },
	},
	rightSidebar: { show: true, hidden: false,hiddenCarrito:false },
	carrito: { show: true, hidden: false},
	menu: [
    {
      key: 'Hemeroteca',
      label: 'Hemeroteca',
      isTitle: false,
      icon: 'mdi mdi mdi-library',
      entidad: '/aula/hemeroteca',
      badge: {
        variant: 'error',
        text: 0,
      },
      children: [],
    },
    {
      key: 'AluaVirtual',
      label: 'AluaVirtual',
      isTitle: false,
      icon: 'mdi mdi-table-account',
      entidad: '/aula/aulavirtual',
      badge: {
        variant: 'error',
        text: 0,
      },
      children: [],
    },
    {
      key: 'Administracion',
      label: 'Administracion',
      isTitle: false,
      icon: 'mdi mdi-database-cog',
      entidad: '/administrador/admin',
      badge: {
        variant: 'error',
        text: 0,
      },
      children: [],
    },
  ],
};

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useThemeContext must be used within an ThemeProvider');
	}
	return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [currentLanguage, setCurrentLanguage] = useState(Languages.ES);
	//const [currentMenu, setCurrentMenu] = useAtom(menuAtoms);

	const [settings, setSettings] = useState({
		layout: {
			type: ThemeSettings.layout.type.horizontal,
			mode: ThemeSettings.layout.mode.fluid,
			menuPosition: ThemeSettings.layout.menuPosition.fixed,
		},
		theme: ThemeSettings.theme.light,
		topbar: {
			theme: ThemeSettings.topbar.theme.light,
			logo: ThemeSettings.topbar.logo.show,
		},
		sidebar: {
			theme: ThemeSettings.sidebar.theme.dark,
			size: ThemeSettings.sidebar.size.default,
			user: ThemeSettings.sidebar.user.hidden,
		},
		rightSidebar: ThemeSettings.rightSidebar.hidden,
		carrito: ThemeSettings.carrito.hidden,
		menu: ThemeSettings.menu
	});

	const changeLanguage = useCallback((lang: string) => {
		if (isValidLanguage(lang)) {
			i18n.changeLanguage(lang);
			setCurrentLanguage(lang);
		}
	}, []);

	const updateSettings = useCallback(
		(newSettings: any) => {
			setSettings((prev) => ({ ...(prev ?? {}), ...(newSettings ?? {}) }));
		},
		[setSettings]
	);

	const updateLayout = useCallback(
		(newLayout: any) => {
			setSettings((prev) => ({
				...(prev ?? {}),
				layout: { ...(prev ?? {}).layout, ...(newLayout ?? {}) },
			}));
		},
		[setSettings]
	);

	const updateTopbar = useCallback(
		(newTopbar: any) => {
			setSettings((prev) => ({
				...(prev ?? {}),
				topbar: { ...(prev ?? {}).topbar, ...(newTopbar ?? {}) },
			}));
		},
		[setSettings]
	);

	const updateSidebar = useCallback(
		(newSidebar: any) => {
			setSettings((prev) => ({
				...(prev ?? {}),
				sidebar: { ...(prev ?? {}).sidebar, ...(newSidebar ?? {}) },
			}));
		},
		[setSettings]
	);
	const updateMenu = useCallback(
		(newMenu: MenuItem) => {
			///setCurrentMenu(JSON.parse(sessionStorage.getItem('_MENU') || '{}'));
			setSettings((prev) => ({
				...(prev ?? {}),
				menu: { ...(prev ?? {}).menu, ...(newMenu ?? {}) },
			}));
		
	},
	[setSettings] 
	);	
 
	return (
		<ThemeContext.Provider
			value={{
				changeLanguage,
				currentLanguage,
				settings,
				updateSettings,
				updateLayout,
				updateTopbar,
				updateSidebar,
				updateMenu,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
