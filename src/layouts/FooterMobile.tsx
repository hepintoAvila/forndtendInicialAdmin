import { Col, Row } from 'react-bootstrap';
import logoDark from '@/assets/images/logo-dark.png';
export default function FooterMobile() {
    return (
        <footer className="footer">
            <div className="container-fluid">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className="d-flex align-items-center gap-lg-2 gap-2 justify-content-center">
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
          </Col>
        </Row>
            </div>
        </footer>
    );
}
