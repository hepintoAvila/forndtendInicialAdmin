import { Link } from 'react-router-dom';
import { notifications, profileMenus } from './data';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
//import SearchDropdown from './SearchDropdown';
import AppsDropdown from './AppsDropdown';
import MaximizeScreen from './MaximizeScreen';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// assets
import logo from '@/assets/images/logo.png';
import avata1 from '@/assets/images/users/avatar-1.jpg';
import logoDark from '@/assets/images/logo-dark.png';
import logoSm from '@/assets/images/logo-sm.png';
import logoDarkSm from '@/assets/images/logo-dark-sm.png';
import { ThemeSettings, useAuthContext, useThemeContext } from '@/common';
import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useViewport } from '@/hooks';
import { Auth } from '@/types';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
	user?: Auth;
};


const Topbar = ({ topbarDark, toggleMenu, navOpen }: TopbarProps) => {
	const { settings, updateSettings, updateSidebar,updateMenu } = useThemeContext();
	const { datosUser } = useAuthContext();
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
			} else {
				updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
			}
		} else if (sideBarType === 'condensed') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default });
		} else if (sideBarType === 'full' || sideBarType === 'fullscreen') {
			showLeftSideBarBackdrop();
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
		} else {
			updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
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
	  const {
		user,
		isAuthenticated,
		 } = useAuth0();
 

		const imag= user?.picture ? user?.picture:avata1;
		const username= user?.nickname ? user?.nickname:datosUser?.Nom;
		const rolUser= user?.Rol ? user?.Rol:datosUser?.Rol;
	
	return (
		<div className={'navbar-custom'}>
			<div className="topbar container-fluid">
				<div className="d-flex align-items-center gap-lg-2 gap-1">
					<div className="logo-topbar">
						<Link to="/" className={topbarDark ? 'logo-light' : 'logo-dark'}>
							<span className="logo-lg">
								<img src={topbarDark ? logo : logoDark} alt="logo" />
							</span>
							<span className="logo-sm">
								<img src={topbarDark ? logoSm : logoDarkSm} alt="small logo" />
							</span>
						</Link>
					</div>

					<button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
						<i className="mdi mdi-menu" />
					</button>

					<button
						className={`navbar-toggle ${navOpen ? 'open' : ''}`}
						onClick={toggleMenu}
					>
						<div className="lines">
							<span />
							<span />
							<span />
						</div>
					</button>

					 
				</div>

				<ul className="topbar-menu d-flex align-items-center gap-3">
				 
					<li className="dropdown notification-list">
						<NotificationDropdown notifications={notifications} />
					</li>
					<li className="dropdown d-none d-sm-inline-block">
						<AppsDropdown />
					</li>
					{/*<li className="d-none d-sm-inline-block">
						<button
							className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
							onClick={handleRightSideBar}
						>
							<i className="ri-settings-3-line font-22"></i>
						</button>
					</li>*/}

					<li className="d-none d-sm-inline-block">
						<OverlayTrigger
							placement="left"
							overlay={<Tooltip id="dark-mode-toggler">Oscurecer</Tooltip>}
						>
							<div className="nav-link" id="light-dark-mode" onClick={toggleDarkMode}>
								<i className="ri-moon-line font-22" />
							</div>
						</OverlayTrigger>
					</li>

					<li className="d-none d-md-inline-block">
						<MaximizeScreen />
					</li>

					<li className="dropdown">
						<ProfileDropdown
							picture={imag}
							menuItems={profileMenus}
							username={username}
							userTitle={rolUser}
						/>
					</li>
					<li className="d-none d-sm-inline-block">
						<button
							className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
							onClick={handleRightCarrito}
						>
							<i className="mdi mdi-school-outline"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Topbar;
