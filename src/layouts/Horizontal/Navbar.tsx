 
import { getHorizontalMenuItems } from '../utils/menu';
import AppMenu from './Menu';
import { Collapse, Container } from 'react-bootstrap';
 

type NavbarProps = {
	menu?: any;
	navOpen?: boolean;
};

const Navbar = ({menu,navOpen }: NavbarProps) => {
	return (
		<div className="topnav navbar-border">

			<Container fluid>
				<nav className="navbar navbar-expand-lg">
					<Collapse in={navOpen}>
						<div className="navbar-collapse active">
							<AppMenu menuItems={getHorizontalMenuItems(menu)} />
						</div>
					</Collapse>
				</nav>
			</Container>
		</div>
	);
};

export default Navbar;
