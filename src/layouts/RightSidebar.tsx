import SimpleBar from 'simplebar-react';
import { Offcanvas } from 'react-bootstrap';

import { ThemeSettings, useThemeContext } from '@/common';
 
import { useEffect } from 'react';

const RightSideBar = () => {
	const { updateSettings, settings,updateMenu} = useThemeContext();



	const isOpenRightSideBar = settings.rightSidebar;
 
	/**
	 * Toggles the right sidebar
	 */
	const handleRightSideBar = () => {
		updateSettings({ rightSidebar: ThemeSettings.rightSidebar.hidden });
		
	};
	useEffect(() => {
		updateMenu()
	}, []);
   
 
	//console.log('RightSideBar',itemsCarrito);
	return (
		<>
			<Offcanvas
				show={isOpenRightSideBar}
				onHide={handleRightSideBar}
				placement="end"
				id="theme-settings-offcanvas"
			>
				<Offcanvas.Header
					className="d-flex align-items-center bg-primary p-3"
					closeVariant="white"
					closeButton
				>
					<h5 className="text-white m-0">{'Nuevo Carro (1)'}</h5>
				</Offcanvas.Header>

				<Offcanvas.Body className="p-0">
					<SimpleBar scrollbarMaxSize={320} className="h-100">
					 
					</SimpleBar>
				</Offcanvas.Body>


			</Offcanvas>
		</>
	);
};

export default RightSideBar;
