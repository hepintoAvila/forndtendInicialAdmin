
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MaximizeScreen from './MaximizeScreen';
import ProfileDropdown from './ProfileDropdown';

interface DesktopNavbarProps {
  width: number;
  topbarDark: boolean;
  logo: string;
  logoDark: string;
  logoSm: string;
  logoDarkSm: string;
  handleLeftMenuCallBack: () => void;
  toggleMenu: () => void;
  navOpen: boolean;
  toggleDarkMode: () => void;
  handleRightSideBar: () => void;
  avata1: string;
  profileMenus: any[];
  username: string;
  rolUser: string;
  handleRightCarrito: () => void;
}

const DesktopNavbar=({
  width,
  topbarDark,
  logo,
  logoDark,
  logoSm,
  logoDarkSm,
  handleLeftMenuCallBack,
  toggleMenu,
  navOpen,
  toggleDarkMode,
  handleRightSideBar,
  avata1,
  profileMenus,
  username,
  rolUser,
  handleRightCarrito,
}:DesktopNavbarProps) => {
  return (
    <div className={`navbar-custom ${width > 1140 ? '' : 'd-none'}`}>
      <div className="topbar container-fluid">
        <div className="d-flex align-items-center gap-lg-2 gap-1">
          <div className="logo-topbar">
            <Link to="/" className={topbarDark ? 'logo-light' : 'logo-dark'}>
              <span className="logo-lg">
                <img src={topbarDark ? logo : logoDark} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={topbarDark ? logoSm : logoDarkSm} alt="small logo" />
              </span>
            </Link>
          </div>

          <button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
            <i className="mdi mdi-menu" />
          </button>

          <button
            className={`navbar-toggle ${navOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="lines">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>

        <ul className="topbar-menu d-flex align-items-center gap-3">
          <li className="d-none d-sm-inline-block">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="dark-mode-toggler">Oscurecer</Tooltip>}
            >
              <div className="nav-link" id="light-dark-mode" onClick={toggleDarkMode}>
                <i className="ri-moon-line font-22" />
              </div>
            </OverlayTrigger>
          </li>

          <li className="d-none d-md-inline-block">
            <MaximizeScreen />
          </li>

          <li className="dropdown">
            <ProfileDropdown
              picture={avata1}
              menuItems={profileMenus}
              username={username}
              userTitle={rolUser}
            />
          </li>
          <li className="d-none d-sm-inline-block">
            <button
              className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
              onClick={handleRightCarrito}
            >
              <i className="mdi mdi-school-outline"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNavbar;