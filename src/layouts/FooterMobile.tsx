import { Col, Row } from 'react-bootstrap';
import logoDark from '@/assets/images/logo-dark.png';
export default function FooterMobile() {
    return (
        <footer className="footer">
            <div className="container-fluid">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className="d-flex align-items-center gap-lg-2 gap-2 justify-content-center" style={{marginLeft:"-5rem"}}>
              <a
                href="https://biblioteca.unicesar.edu.co"
                target="_blank"
                className="sm-0"
                style={{ width: 'inherit' }}
              >
                <img src={logoDark} className="logo" alt="React logo" width={100} />
              </a>
              <h5 className="text-left text-muted fw-normal mt-0 text-truncate">
                <b className="text-white" >Sistema de Información de Visitas y Préstamos de Equipos</b>
                <br />
                <b className="text-white" >Universidad Popular del Cesar</b>
              </h5>
            </div>
          </Col>
        </Row>
            </div>
        </footer>
    );
}
