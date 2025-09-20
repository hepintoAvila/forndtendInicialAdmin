import logoDark from '@/assets/images/logo-dark.png';
import { ThemeSettings, useThemeContext } from '@/common';
//import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { Dropdown, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import avata1 from '@/assets/images/users/avatar-1.jpg';
import Login from '../account/Login';
 import menuBiblioteca from '@/assets/images/menuBiblioteca.png';
 import menuKoha from '@/assets/images/menuKoha.png';

type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
	user?: any;
};


const Topbar = ({ topbarDark, toggleMenu, navOpen }: TopbarProps) => {

	const {  updateMenu } = useThemeContext();
	const {isAuthenticated } = useAuth();
	//const { reset } = useThemeCustomizer();
	//const { sideBarType } = useThemeCustomizer();
	//const { width } = useViewport();
	const [showLoginModal, setShowLoginModal] = useState(false);

	const toggleDropdown = () => {
		setShowLoginModal(!showLoginModal);
	};
	/**
	 * Toggle the leftmenu when having mobile screen
	 */
	/**
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

	
	 * creates backdrop for leftsidebar
	
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
 */

	useEffect(() => {
		if (isAuthenticated) {
			updateMenu()
		}
	}, [ThemeSettings]);
	return (
		<><div className={'bg-success navbar-custom'}>
			<div className=" bg-success topbar container-fluid">

				<div className="d-flex align-items-center gap-lg-2 gap-2">
					
				<a href="https://biblioteca.unicesar.edu.co" target="_blank" className="sm-0" style={{width:'inherit'}}>
				<img src={logoDark} className="logo" alt="React logo" width={100}  />
				</a> 
				<h5  className="text-center text-white text-muted fw-normal mt-0 text-truncate">Sistema de Información de Visitas y Préstamos de Equipos<br/>Universidad Popular del Cesar</h5> 
				
				 
				</div>
				<ul className="topbar-menu d-flex align-items-center gap-3">
				<li className="d-none d-sm-inline-block">
						<OverlayTrigger
							placement="left"
							overlay={<Tooltip id="dark-mode-toggler">ir a la Biblioteca</Tooltip>}
						>
								<span className="account-user-avatar">
									<a href="https://biblioteca.unicesar.edu.co/wp/" target="_blank" className="sm-0" style={{width:'inherit'}}>
								<img className="rounded-circle" src={menuBiblioteca}  alt="" /></a>
								</span>
						 
						</OverlayTrigger>
					</li>
					<li className="d-none d-sm-inline-block">
						<OverlayTrigger
							placement="left"
							overlay={<Tooltip id="dark-mode-toggler">ir Koha</Tooltip>}
						>
								<span className="account-user-avatar">
									<a href="https://koha.unicesar.edu.co/" target="_blank" className="sm-0" style={{width:'inherit'}}>
								<img className="rounded-circle" src={menuKoha}  alt="" /></a>
								</span>
						 
						</OverlayTrigger>
					</li>
					<li className="dropdown">
						<OverlayTrigger
							placement="left"
							overlay={<Tooltip id="dark-mode-toggler">Iniciar Sesión</Tooltip>}
						> 
						<Dropdown.Toggle
							variant="link"
							id="dropdown-profile"
							as={'button'}
							onClick={toggleDropdown}
							className="nav-link dropdown-toggle arrow-none nav-user px-2"
						>
							<span className="account-user-avatar">
								<img src={avata1} className="rounded-circle" width={40} alt="user" />
							</span>
						</Dropdown.Toggle>
						</OverlayTrigger>
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
