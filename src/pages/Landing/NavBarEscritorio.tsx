import React from 'react';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

interface TopbarProps {
  logoDark: string;
  menuBiblioteca: string;
  menuKoha: string;
  avata1: string;
  toggleDropdown: () => void;
}

const NavBarEscritorio: React.FC<TopbarProps> = ({
  logoDark,
  menuBiblioteca,
  menuKoha,
  avata1,
  toggleDropdown,
}) => {
  return (
    <div className={'bg-success navbar-custom'}>
      <div className="bg-success topbar container-fluid">
        <div className="d-flex align-items-center gap-lg-2 gap-2">
          <a
            href="https://biblioteca.unicesar.edu.co"
            target="_blank"
            className="sm-0"
            style={{ width: 'inherit' }}
          >
            <img src={logoDark} className="logo" alt="React logo" width={100} />
          </a>
          <h5 className="text-center text-white text-muted fw-normal mt-0 text-truncate">
            Sistema de Información de Visitas y Préstamos de Equipos
            <br />
            Universidad Popular del Cesar
          </h5>
        </div>
        <ul className="topbar-menu d-flex align-items-center gap-3">
          <li className="d-none d-sm-inline-block">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="dark-mode-toggler">ir a la Biblioteca</Tooltip>}
            >
              <span className="account-user-avatar">
                <a
                  href="https://biblioteca.unicesar.edu.co/wp/"
                  target="_blank"
                  className="sm-0"
                  style={{ width: 'inherit' }}
                >
                  <img
                    className="rounded-circle"
                    src={menuBiblioteca}
                    alt=""
                  />
                </a>
              </span>
            </OverlayTrigger>
          </li>
          <li className="d-none d-sm-inline-block">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="dark-mode-toggler">ir Koha</Tooltip>}
            >
              <span className="account-user-avatar">
                <a
                  href="https://koha.unicesar.edu.co/"
                  target="_blank"
                  className="sm-0"
                  style={{ width: 'inherit' }}
                >
                  <img className="rounded-circle" src={menuKoha} alt="" />
                </a>
              </span>
            </OverlayTrigger>
          </li>
          <li className="dropdown">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="dark-mode-toggler">Iniciar Sesión</Tooltip>}
            >
              <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={'button'}
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none nav-user px-2"
              >
                <span className="account-user-avatar">
                  <img src={avata1} className="rounded-circle" width={40} alt="user" />
                </span>
              </Dropdown.Toggle>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarEscritorio;