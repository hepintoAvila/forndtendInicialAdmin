import { Link } from 'react-router-dom';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { ProfileOption } from './types';
import { useLogout, useToggle } from '@/hooks';
import usernavrow from '@/assets/images/user-nav-row.png';
import { useState } from 'react';
import useUsuarios from '@/hooks/useUsuarios';

//import { useAuth0 } from '@auth0/auth0-react';

type ProfileDropdownProps = {
    menuItems?: Array<ProfileOption>;
    picture?: string;
    username?: string | null;
    userTitle?: string | null;
};

const ProfileDropdown = ({ userTitle, username, menuItems, picture }: ProfileDropdownProps) => {
	const {handleSubmitPass} =useUsuarios()
    const [isOpen, toggleDropdown] = useToggle();
    const logout = useLogout();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleLogout = async () => {
        await logout();
    };
 

    return (
        <>
            <Dropdown show={isOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    variant="link"
                    id="dropdown-profile"
                    as={'button'}
                    onClick={toggleDropdown}
                    className="nav-link dropdown-toggle arrow-none nav-user px-0">
                    <div className="nav-user-line"></div>
                    <span className="account-user-avatar">
                        <img src={picture} className="rounded-circle" width={32} alt="user" />
                    </span>
                    <span className="d-lg-flex flex-column gap-1">
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
                                    onClick={
                                        item.id === 2
                                            ? () => handleLogout()
                                            : item.id === 1
                                              ? handleShowModal
                                              : () => {}
                                    }
                                    className="dropdown-item notify-item"
                                    key={i + '-profile-menu'}>
                                    <i className={classNames(item.icon, 'me-4')}></i>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPass} className="position-relative bg-light mb-0">
                        <Row>
                            <Col sm={8}>
                                <Form.Group controlId="validation">
                                    <Form.Control
                                        required
                                        type="text"
                                        name="pass"
                                        placeholder="Digite el nuevo password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, digite el password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className={'button-position ms-0'}>
                                <Button className={'position-relative mt-0 mb-4 button-rounded'} type="submit">
                                    <i className="ri-calendar-check-line"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileDropdown;
