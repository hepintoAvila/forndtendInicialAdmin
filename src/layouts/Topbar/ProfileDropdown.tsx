import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { ProfileOption } from './types';
import { useToggle } from '@/hooks';
import usernavrow from '@/assets/images/user-nav-row.png';
import Logout from '@/pages/account/Logout';
import useLogout from '@/pages/account/Logout/useLogout';
//import { useAuth0 } from '@auth0/auth0-react';

type ProfileDropdownProps = {
	menuItems?: Array<ProfileOption>;
	picture?: string;
	username?: string | null;
	userTitle?: string | null;
};

const ProfileDropdown = ({ userTitle, username, menuItems, picture }: ProfileDropdownProps) => {
	const [isOpen, toggleDropdown] = useToggle();
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
	};
/*
	//const {logout} = useAuth0();
	const logoutWithRedirect = () =>{

	}
		/*logout({
			logoutParams: {
			  returnTo: window.location.origin,
			
		});
}*/
const logoutWithRedirect = (redirectUrl = window.location.origin) => {
	sessionStorage.removeItem('_AUTH');
	sessionStorage.removeItem('_MENU');
 
	window.location.href = redirectUrl;
  };	
	return (
		<Dropdown show={isOpen} onToggle={toggleDropdown}>

			<Dropdown.Toggle
				variant="link"
				id="dropdown-profile"
				as={'button'}
				onClick={toggleDropdown}
				className="nav-link dropdown-toggle arrow-none nav-user px-2"
			>
				<div className="nav-user-line">

				</div>
				<span className="account-user-avatar">
					<img src={picture} className="rounded-circle" width={32} alt="user" />
				</span>
				<span className="d-lg-flex flex-column gap-1 d-none">
					<h5 className="my-0">{username}</h5>
					<h6 className="my-0 fw-normal align-self-start">{userTitle}</h6>

				</span>
				<img src={usernavrow} className="icon-header-navbar-row" />
			</Dropdown.Toggle>

			<Dropdown.Menu align={'end'} className="dropdown-menu-animated profile-dropdown">
				<div onClick={toggleDropdown}>
					<div className="dropdown-header noti-title">
						<h6 className="text-overflow m-0">Bienvenidos</h6>
					</div>
					{menuItems?.map((item, i) => {
						
						return (
							
							<Link
								to={item.redirectTo}
								onClick={(item.id===2)?() => handleLogout():()=>{}}
								className="dropdown-item notify-item"
								key={i + '-profile-menu'}
							>
								<i className={classNames(item.icon, 'me-1')}></i>
								<span>{item.label}</span>
							</Link>
						);
					})}


				</div>
			</Dropdown.Menu>

		</Dropdown>
	);
};

export default ProfileDropdown;
