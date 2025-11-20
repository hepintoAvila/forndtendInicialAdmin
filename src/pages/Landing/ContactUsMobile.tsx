import { Container, Row, Col, Card } from 'react-bootstrap';
import webBiblioteca from '@/assets/images/webBiblioteca.png';
import webKoha from '@/assets/images/webKoha.png';

import Layouts from './Layouts';

const ContactUsMobile = ({ layouts }: any) => {
  return (
    <section className="py-0 px-0 bg-light-lighten border-top border-bottom border-light" id="contact-us-landing">
      <Container>
        <Row>
          <Col lg={12}>
            <Layouts layouts={layouts} />
            <div className="d-flex flex-column">
              <Card className="bg-transparent text-black border-top border-bottom border-light p-3 mt-5">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="w-100 overflow-hidden">
                      <h3 className="m-0 fw-normal cta-box-title text-reset">
                        <br />
                      </h3>
                    </div>
                    <a
                      href=""
                      target="_blank"
                      className="sm-0"
                      style={{ width: 'inherit' }}
                    >
                      <img className="ms-3" src={webBiblioteca} width="120" alt="" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
              <Card className="bg-transparent text-black border-top border-bottom border-light p-3 mt-5">
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
                      style={{ width: 'inherit' }}
                    >
                      <img className="ms-3" src={webKoha} width="120" alt="" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsMobile;
