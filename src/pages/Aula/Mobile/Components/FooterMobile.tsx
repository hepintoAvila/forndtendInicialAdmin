import { Col, Row } from 'react-bootstrap';
export default function FooterMobile() {
    return (
       
      <div className="container-fluid-profesionales cta-box">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className="d-flex align-items-center gap-lg-2 gap-2 justify-content-center">
                 <h6 className="text-left text-muted fw-normal mt-0 text-truncate">
                <b className="text-black" >Sistema de Información de Visitas y Préstamos de Equipos</b>
                <br />
                <b className="text-black" >Universidad Popular del Cesar</b>
              </h6>
            </div>
          </Col>
        </Row>
        </div>
       
    );
}
