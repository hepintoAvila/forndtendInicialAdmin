import logoDark from '@/assets/images/logo-dark.png';
import { ThemeSettings, useThemeContext } from '@/common';
import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useAuth, useViewport } from '@/hooks';
import { useEffect, useState } from 'react';

import usernavrow from '@/assets/images/user-nav-row.png';
import { Dropdown, Modal } from 'react-bootstrap';
import avata1 from '@/assets/images/users/avatar-1.jpg';
import Login from '../account/Login';
 

type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
	user?: any;
};


const Topbar = ({ topbarDark, toggleMenu, navOpen }: TopbarProps) => {

	const { settings, updateSidebar, updateMenu } = useThemeContext();
	const { user, isAuthenticated } = useAuth();
	//const { reset } = useThemeCustomizer();
	const { sideBarType } = useThemeCustomizer();
	const { width } = useViewport();
	const [showLoginModal, setShowLoginModal] = useState(false);

	const toggleDropdown = () => {
		setShowLoginModal(!showLoginModal);
	};
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


	useEffect(() => {
		if (isAuthenticated) {
			updateMenu()
		}
	}, [ThemeSettings]);


	//const imag= user?.picture ? user?.picture:avata1;
	const username = user?.Nom ? user?.Nom : 'Iniciar Sesión';


	return (
		<><div className={'navbar-custom bg-light'}>
			<div className="topbar container-fluid">

				<div className="d-flex align-items-center gap-lg-2 gap-1">

					<div className="logo-light">
						 <a href="https://biblioteca.unicesar.edu.co/wp/" target="_blank">
						<img src={logoDark} className="logo upc" alt="React logo" width={100}  />
						</a> 
					</div>
					<button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
						<i className="mdi mdi-menu" />
					</button>



				</div>

				<ul className="topbar-menu d-flex align-items-center gap-3">

					<li className="dropdown">


						<Dropdown.Toggle
							variant="link"
							id="dropdown-profile"
							as={'button'}
							onClick={toggleDropdown}
							className="nav-link dropdown-toggle arrow-none nav-user px-2"
						>

							<span className="account-user-avatar">
								<img src={avata1} className="rounded-circle" width={32} alt="user" />
							</span>
							<span className="d-lg-flex flex-column gap-1 d-none">
								<h5 className="my-0">{username}</h5>
							</span>
							<img src={usernavrow} className="icon-header-navbar-row" />
						</Dropdown.Toggle>
					</li>

				</ul>
			</div>
		</div>
			{showLoginModal && <Modal show={showLoginModal} onHide={toggleDropdown} centered={true} contentClassName="topnav navbar-border" fullscreen={'sm-down'}>
				<Modal.Header closeButton>
					<Modal.Title>Iniciar Sesión</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Login />
				</Modal.Body>
			</Modal>}

		</>
	);
};

export default Topbar;
