import logoDark from '@/assets/images/logo-dark.png';
import { ThemeSettings, useThemeContext } from '@/common';
//import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useAuth, useViewport } from '@/hooks';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import avata1 from '@/assets/images/users/avatar-1.jpg';
import menuBiblioteca from '@/assets/images/menuBiblioteca.png';
import menuKoha from '@/assets/images/menuKoha.png';
import NavBarEscritorio from './NavBarEscritorio';
import NavBarMobile from './NavBarMobile';
import Login from '../Aula/Mobile/Login';

type TopbarProps = {
    topbarDark?: boolean;
    toggleMenu?: () => void;
    navOpen?: boolean;
    user?: any;
};

const Topbar = ({ topbarDark, toggleMenu, navOpen }: TopbarProps) => {
    console.log(topbarDark, navOpen, toggleMenu);

    const { updateMenu } = useThemeContext();
    const { isAuthenticated } = useAuth();
    //const { reset } = useThemeCustomizer();
    //const { sideBarType } = useThemeCustomizer();
    const { width } = useViewport();
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
            updateMenu();
        }
    }, [ThemeSettings]);
    return (
        <>
            {width > 1140 ? (
                <NavBarEscritorio
                    logoDark={logoDark}
                    menuBiblioteca={menuBiblioteca}
                    menuKoha={menuKoha}
                    avata1={avata1}
                    toggleDropdown={toggleDropdown}
                />
            ) : (
                <NavBarMobile
                    logoDark={logoDark}
                    menuBiblioteca={menuBiblioteca}
                    menuKoha={menuKoha}
                    avata1={avata1}
                    toggleDropdown={toggleDropdown}
                />
            )}
            {showLoginModal && (
                <Modal
                    show={showLoginModal}
                    onHide={toggleDropdown}
                    centered={true}
                    contentClassName="topnav navbar-border"
                    fullscreen={'sm-down'}>
                    <Modal.Header closeButton>
                        <Modal.Title>Iniciar Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default Topbar;
