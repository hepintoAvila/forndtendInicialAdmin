import React from 'react';
import { OverlayTrigger, Tooltip, Dropdown, Row, Col } from 'react-bootstrap';

interface TopbarProps {
  logoDark: string;
  menuBiblioteca: string;
  menuKoha: string;
  avata1: string;
  toggleDropdown: () => void;
}

const NavBarMobile: React.FC<TopbarProps> = ({
  logoDark,
  menuBiblioteca,
  menuKoha,
  avata1,
  toggleDropdown,
}) => {
  return (
    <div className={'bg-success navbar-custom cta-box'}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <ul className="topbar-menu d-flex align-items-center gap-3 justify-content-center">
              <li className="d-inline-block">
                <OverlayTrigger
                  placement="bottom"
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
              <li className="d-inline-block">
                <OverlayTrigger
                  placement="bottom"
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
              <li className="d-inline-block">
                <OverlayTrigger
                  placement="bottom"
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
          </Col>
        </Row>
      </div>
 
  );
};

export default NavBarMobile;