import { Container, Row, Col } from 'react-bootstrap';
import desktopFondo from '@/assets/images/fondo_estadisticas.png';
import mobileFondo from '@/assets/images/fondo_estadisticas_mobile.png';

const ContactUs = () => {
  return (
    <section className="py-0 px-0 bg-light-lighten border-top border-bottom border-light" id="contact-us-landing">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="image-container-contactus">
              <img src={desktopFondo} alt="" className="desktop-image-contactus" />
              <img src={mobileFondo} alt="" className="mobile-image-contactus" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;