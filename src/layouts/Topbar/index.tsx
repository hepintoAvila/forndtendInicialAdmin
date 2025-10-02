import { Link } from 'react-router-dom';
import { profileMenus } from './data';
//import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
//import SearchDropdown from './SearchDropdown';
//import AppsDropdown from './AppsDropdown';
import MaximizeScreen from './MaximizeScreen';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// assets
import logo from '@/assets/images/logo.png';
import avata1 from '@/assets/images/users/avatar-1.jpg';
import logoDark from '@/assets/images/logo-dark.jpg';
import logoSm from '@/assets/images/logo-sm.png';
import logoDarkSm from '@/assets/images/logo-dark-sm.png';
import { ThemeSettings, useThemeContext } from '@/common';
import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useAuth, useViewport } from '@/hooks';
//import { Auth } from '@/types';
import { useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import Profile from '@/pages/Aula/Estudiante/Profile';

//import { useAuth0 } from '@auth0/auth0-react';
  type AppConfig = {
  Nom: string;
  Email: string;
  Rol: string;
  status: string;
  AppKey: string;
}


type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
	user?: any;
	appConfig?: AppConfig;
};


const Topbar = ({ topbarDark, toggleMenu, navOpen,appConfig }: TopbarProps) => {
	const { settings, updateSettings, updateSidebar,updateMenu } = useThemeContext();
	const { isAuthenticated } = useAuth();
	//const { reset } = useThemeCustomizer();
	const { sideBarType } = useThemeCustomizer();
	const { width } = useViewport();

	/**
	 * Toggle the leftmenu when having mobile screen
	 */
	const handleLeftMenuCallBack = () => {
		
		if (width < 1140) {
			if (sideBarType === 'full') {
				showLeftSideBarBackdrop();
				document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
			} else if (sideBarType === 'condensed' || sideBarType === 'fullscreen') {
				updateSidebar({ size: ThemeSettings.sidebar.size.default });
				updateMenu({ size: settings.menu });
			} else {
				updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
				updateMenu({ size: settings.menu });
			}
		} else if (sideBarType === 'condensed') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default });
			updateMenu({ size: settings.menu });
		} else if (sideBarType === 'full' || sideBarType === 'fullscreen') {
			showLeftSideBarBackdrop();
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
		} else {
			updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
			updateMenu({ size: settings.menu });
		}
	};

	/**
	 * creates backdrop for leftsidebar
	 */
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div');
		backdrop.id = 'custom-backdrop';
		backdrop.className = 'offcanvas-backdrop fade show';
		document.body.appendChild(backdrop);

		backdrop.addEventListener('click', function () {
			document.getElementsByTagName('html')[0].classList.remove('sidebar-enable');
			hideLeftSideBarBackdrop();
		});
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop');
		if (backdrop) {
			document.body.removeChild(backdrop);
			document.body.style.removeProperty('overflow');
		}
	}

	/**
	 * Toggle Dark Mode
	 */
	const toggleDarkMode = () => {
		if (settings.theme === 'dark') {
			updateSettings({ theme: ThemeSettings.theme.light });
		} else {
			updateSettings({ theme: ThemeSettings.theme.dark });
		}
	};

	/**
	 * Toggles the right sidebar
	
	const handleRightSideBar = () => {
		reset();
	};
	 */
	const handleRightCarrito= () => {
		//carrito();
	};
	useEffect(() => {
		if (isAuthenticated) {
			updateMenu()
		}
	  }, [ThemeSettings]);
	  /*
	  const {
		user,
		isAuthenticated,
		 } = useAuth0();
 	*/

		//const imag= user?.picture ? user?.picture:avata1;
		const username= appConfig?.Rol ? appConfig?.Rol:'Invitado';
		const rolUser= appConfig?.Email ? appConfig?.Email:'';

			return (
				<DesktopNavbar
				width={width}
				topbarDark={topbarDark as any}
				logo={logo}
				logoDark={logoDark}
				logoSm={logoSm}
				logoDarkSm={logoDarkSm}
				handleLeftMenuCallBack={handleLeftMenuCallBack}
				toggleMenu={toggleMenu as any}
				navOpen={navOpen as any}
				toggleDarkMode={toggleDarkMode}
				handleRightSideBar={() => {}}
				avata1={avata1}
				profileMenus={profileMenus}
				username={username}
				rolUser={rolUser}
				handleRightCarrito={handleRightCarrito}
				/>
			)
};

export default Topbar;
