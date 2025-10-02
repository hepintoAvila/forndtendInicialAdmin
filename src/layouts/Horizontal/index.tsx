import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useToggle } from '@/hooks';
import { useThemeContext } from '@/common/context';
import { changeHTMLAttribute } from '@/utils';
import getUserFromSession from '@/common/helpers/getUserFromSession';
import { useAuth0 } from "@auth0/auth0-react";
// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../Topbar/'));
const Navbar = React.lazy(() => import('./Navbar'));
const Footer = React.lazy(() => import('../Footer'));
const FooterMobile = React.lazy(() => import('@/layouts/FooterMobile'));
//const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className="text-center"></div>;
import { useViewport } from '@/hooks';

import ProfileMobile from '@/pages/Landing/ProfileMobile';
 // Componente que usa el hook de permisos
const HorizontalLayout = () => {
	const { isAuthenticated } = useAuth0();
	 const { width } = useViewport();
	const appConfig = getUserFromSession();
	const { settings,updateMenu } = useThemeContext();
	const [isOpen, toggleMenu] = useToggle(); 
	//const isAdmin = appConfig.status === 'Inactivo';
	/*
	 * layout defaults
	 */
	useEffect(() => {
		changeHTMLAttribute('data-layout', 'topnav');
		return () => {
			document.getElementsByTagName('html')[0].removeAttribute('data-layout');
		};
	}, []);

	useEffect(() => {
		changeHTMLAttribute('data-bs-theme', settings.theme);
	}, [settings.theme]);

	useEffect(() => {
		changeHTMLAttribute('data-layout-mode', settings.layout.mode);
	}, [settings.layout.mode]);

	useEffect(() => {
		changeHTMLAttribute('data-menu-color', settings.sidebar.theme);
	}, [settings.sidebar.theme]);

	useEffect(() => {
		changeHTMLAttribute('data-topbar-color', settings.topbar.theme);
	}, [settings.topbar.theme]);

	useEffect(() => {
		changeHTMLAttribute('data-layout-position', settings.layout.menuPosition);
	}, [settings.layout.menuPosition]);
	useEffect(() => {
		updateMenu()
	}, [settings.topbar.menu]);
	 

	//const cuMenu = JSON.parse(sessionStorage.getItem('_MENU') || '{}')
	//content-page cta-box
 	return (
		<div className={`content`}>
					{!isAuthenticated &&
					 (
					<>
					<Suspense fallback={loading()}>
							<Topbar
							toggleMenu={toggleMenu}
							navOpen={isOpen}
							topbarDark={false}
							appConfig={appConfig}
						/>
						<Navbar navOpen={isOpen}/>
						</Suspense>
					</>
					)}
			{width < 1140 && !isAuthenticated &&
				<Suspense fallback={loading()}>
					<ProfileMobile />
				</Suspense>}
			<div className="ml-0" style={{marginTop:'4rem'}}>
				<div className={width > 1140 ? `content`:`content mt-5` } >
				<div className="cta-box">
					<Container fluid >
						<Suspense fallback={loading()}>
							<Outlet />
						</Suspense>
					</Container>
				</div>
				</div>

				<Suspense fallback={loading()}>
					{width > 1140 ? <Footer />:<FooterMobile />}
				</Suspense>
				{/*	
				<Suspense fallback={loading()}>
					<RightSidebar />
				</Suspense>
				*/} 
			</div>
		</div>
	);
};

export default HorizontalLayout;
