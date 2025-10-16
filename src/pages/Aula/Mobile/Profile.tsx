
import { Container, Dropdown } from "react-bootstrap";
import avata1 from '@/assets/images/users/avatar-1.jpg'; 
import { useAuth, useLogout, useToggle } from '@/hooks';
import usernavrow from '@/assets/images/user-nav-row.png';
import { ProfileOption } from "@/layouts/Topbar/types";
import { Link } from "react-router-dom";
import classNames from 'classnames';

const Profile = () => {
const logout = useLogout();

const { isAuthenticated } = useAuth();
const [isOpen, toggleDropdown] = useToggle();
const profileMenus: ProfileOption[] = [
    {
        id: 1,
        label: 'Salir',
        icon: 'mdi mdi-logout',
        redirectTo: '/aula/logout',
    },
];
const handleLogout = async () => {
        await logout();
    };
     const user = JSON.parse(localStorage.getItem('userData') || '{}');
  return (<>
    {isAuthenticated && ( 
      <Container fluid className="pl-0" style={{marginLeft:'-1rem',height: '2rem',marginBottom:'1rem'}}>
         <Dropdown show={isOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    variant="link"
                    id="dropdown-profile"
                    as={'button'}
                    onClick={toggleDropdown}
                    className="nav-link dropdown-toggle arrow-none nav-user px-0 bg-light" style={{width: '22rem'}}>
                    <div className="nav-user-line"></div>
                    <span className="account-user-avatar" onClick={toggleDropdown}>
                    <img
                        className="rounded-circle"
                        width={32}
                        src={avata1}
                        alt={user?.Nom}
                    />
                    </span>
                    <span className="d-lg-flex flex-column gap-1 ">
                        <h5 className="my-0">{user?.Nom}</h5>
                        <h6 className="my-0 fw-normal align-self-start">{user?.Email}</h6>
                    </span>
                  <img src={usernavrow} className="icon-header-navbar-row" />  
                </Dropdown.Toggle>

                <Dropdown.Menu align={'end'} className="dropdown-menu-animated profile-dropdown-mobile ">
                    <div onClick={toggleDropdown}>
                        {profileMenus?.map((item, i) => {
                            return (
                                <Link
                                    to={item.redirectTo}
                                    onClick={() => handleLogout()
                                    }
                                    className="dropdown-item notify-item"
                                    key={i + '-profile-menu'}>
                                    <i className={classNames(item.icon, 'me-4')}></i>
                                    <span className="text-white">{item.label}</span>
                                </Link>
                            );
                        })}
                        
                    </div>
                    
                </Dropdown.Menu>
            </Dropdown>
      </Container>
    )
}</>
  );
};

export default Profile;