import { Container, Row, Col, Card } from 'react-bootstrap';
import desktopFondo from '@/assets/images/fondo_estadisticas.png';
import mobileFondo from '@/assets/images/fondo_estadisticas_mobile.png';
import webBiblioteca from '@/assets/images/webBiblioteca.png';
import webKoha from '@/assets/images/webKoha.png';

import Layouts from './Layouts';

const ContactUs = ({ layouts }: any) => {
    return (
        <section className="py-0 px-0 bg-light-lighten border-top border-bottom border-light" id="contact-us-landing">
            <Container>
                <Row>
                    <Col lg={11}>
                        <Layouts layouts={layouts} />
                        <div className="image-container-contactus">
                            <Row>
                                <Col lg={6}>
                                    <img src={mobileFondo} alt="" className="desktop-image-contactus" width={400} />
                                </Col>
                                <Col lg={6}>
                                    <img src={desktopFondo} alt="" className="desktop-image-contactus" />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <img src={mobileFondo} alt="" className="mobile-image-contactus" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={1}>
                        <Card className="bg-transparent text-black border-top border-bottom border-light p-3 h25 mt-5">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="w-100 overflow-hidden">
                                        <h3 className="m-0 fw-normal cta-box-title text-reset">
                                            <br />
                                        </h3>
                                    </div>
                                    <a
                                        href="https://biblioteca.unicesar.edu.co/wp/"
                                        target="_blank"
                                        className="sm-0"
                                        style={{ width: 'inherit' }}>
                                        <img className="ms-3" src={webBiblioteca} width="120" alt="" />
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className=" bg-transparent text-black border-top border-bottom border-light p-3 h25 mt-5">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="w-100 overflow-hidden">
                                        <h3 className="m-0 fw-normal cta-box-title text-reset">
                                            <br />
                                        </h3>
                                    </div>
                                    <a
                                        href="https://koha.unicesar.edu.co"
                                        target="_blank"
                                        className="sm-0"
                                        style={{ width: 'inherit' }}>
                                        <img className="ms-3" src={webKoha} width="120" alt="" />
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactUs;
