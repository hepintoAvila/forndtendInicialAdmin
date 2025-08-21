import {useEffect, createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Auth,Menu } from '@/types';
 

type AuthTopbar = {
	name?: string;
	rol?: string;
};
const AuthContext = createContext<any>({});


export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}

const authSession = '_AUTH';
const authMenu = '_MENU';

export function AuthProvider({ children }: { children: ReactNode }) {
	const [MENU_ITEMS_CONTEXT, setmenu] = useState<Menu | null>();

	const [datosUser, setUser] = useState(
		sessionStorage.getItem(authSession)
			? JSON.parse(sessionStorage.getItem(authSession) || '{}')
			: undefined
	);
	const [nameRol, setAuth] = useState<AuthTopbar>({ name: '', rol: '' });
//setTimeout(function () {}, 5000);
	useEffect(() => {
		if (sessionStorage.getItem(authSession)) {
		setAuth({
			name: datosUser.Nom,
			rol: datosUser.Rol
		  });
		  
		}
	  }, []);

	const saveSession = useCallback(
		(datosUser: Auth) => {
			sessionStorage.setItem(authSession, JSON.stringify(datosUser));
			setUser(datosUser);
		},
		[setUser]
	);
	const saveMenus = useCallback(
		(menu: Menu) => {
			sessionStorage.setItem(authMenu, JSON.stringify(menu));
			setmenu(menu);
			},
		[setmenu]
	);
	const removeSession = useCallback(() => {
		sessionStorage.clear(); 
		sessionStorage.removeItem(authSession);
		sessionStorage.removeItem(authMenu);
		sessionStorage.removeItem('_PREGUNTAS');
		setUser(undefined);
	}, [setUser]);

	return (
		<AuthContext.Provider
			value={{
				nameRol,
				datosUser,
				isAuthenticated: Boolean(datosUser),
				saveSession,
				removeSession,
				saveMenus,
				MENU_ITEMS_CONTEXT,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
