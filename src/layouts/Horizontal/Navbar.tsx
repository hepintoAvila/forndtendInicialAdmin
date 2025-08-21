 
 
 
import AppMenu from './Menu';
import { Collapse, Container } from 'react-bootstrap';
 

type NavbarProps = {
	navOpen?: boolean;
};

const Navbar = ({navOpen }: NavbarProps) => {
	
 
	return (
		<div className="topnav navbar-border">

			<Container fluid>
				<nav className="navbar navbar-expand-lg">
					<Collapse in={navOpen}>
						<div className="navbar-collapse active">
							<AppMenu/>
						</div>
					</Collapse>
				</nav>
			</Container>
		</div>
	);
};

export default Navbar;
