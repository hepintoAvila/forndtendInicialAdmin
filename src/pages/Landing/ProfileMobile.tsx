import { Container, Dropdown } from "react-bootstrap";
import avata1 from '@/assets/images/users/avatar-1.jpg';
import { useLogout, useToggle } from '@/hooks';
import usernavrow from '@/assets/images/user-nav-row.png';
import { ProfileOption } from "@/layouts/Topbar/types";
import { Link } from "react-router-dom";
import classNames from 'classnames';

const ProfileMobile = () => {
const logout = useLogout();
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
      <Container fluid className="pl-0 container-mobile">
         <Dropdown show={isOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    style={{marginLeft:'13rem'}}
                    variant="link"
                    id="dropdown-profile"
                    as={'button'}
                    onClick={toggleDropdown}
                    className="nav-link dropdown-toggle arrow-none nav-user px-2">
                    <div className="nav-user-line"></div>
                    <span className="account-user-avatar" onClick={toggleDropdown}>
                         {(
                                <img
                                className="rounded-circle"
                                width={32}
                                src={avata1}
                                alt=''
                                />
                            )
                            }
                    </span>
                    <span className="d-lg-flex flex-column gap-1">
                        <h5 className="my-0"></h5>
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
                                    <span style={{color:'#ffff'}}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
      </Container>
  
  );
};

export default ProfileMobile;