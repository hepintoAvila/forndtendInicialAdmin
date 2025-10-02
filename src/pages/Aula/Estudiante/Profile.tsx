import { useAuth0 } from "@auth0/auth0-react";
import { Container, Dropdown } from "react-bootstrap";
import avata1 from '@/assets/images/users/avatar-1.jpg';
import { useLogout, useToggle } from '@/hooks';
import usernavrow from '@/assets/images/user-nav-row.png';
import { ProfileOption } from "@/layouts/Topbar/types";
import { Link } from "react-router-dom";
import classNames from 'classnames';

const Profile = () => {
const logout = useLogout();
const { user, isAuthenticated } = useAuth0();
const [isOpen, toggleDropdown] = useToggle();
const profileMenus: ProfileOption[] = [
    {
        id: 1,
        label: 'Salir',
        icon: 'mdi mdi-logout',
        redirectTo: '/account/logout',
    },
];
const handleLogout = async () => {
        await logout();
    };
  return (
    isAuthenticated && (
      <Container fluid className="pl-0 " style={{marginLeft:'0rem', width: '100%', height: '5rem'}}>
         <Dropdown show={isOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    variant="link"
                    id="dropdown-profile"
                    as={'button'}
                    onClick={toggleDropdown}
                    className="nav-link dropdown-toggle arrow-none nav-user px-2">
                    <div className="nav-user-line"></div>
                    <span className="account-user-avatar" onClick={toggleDropdown}>
                         {
                            user?.picture && typeof user.picture === 'string' && user.picture.trim() !== '' ? (
                                <img
                                className="rounded-circle"
                                width={32}
                                src={user.picture}
                                alt={user?.name}
                                onError={(e:any) => {
                                    e.target.src = avata1; // Si la imagen falla, muestra la imagen predeterminada
                                }}
                                />
                            ) : (
                                <img
                                className="rounded-circle"
                                width={32}
                                src={avata1}
                                alt={user?.name}
                                />
                            )
                            }
                    </span>
                    <span className="d-lg-flex flex-column gap-1">
                        <h5 className="my-0">{user?.name}</h5>
                        <h6 className="my-0 fw-normal align-self-start">{user?.email}</h6>
                    </span>
                    <img src={usernavrow} className="icon-header-navbar-row" />
                </Dropdown.Toggle>

                <Dropdown.Menu align={'end'} className="dropdown-menu-animated profile-dropdown-mobile bg-light">
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
                                    <span >{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
      </Container>
    )
  );
};

export default Profile;