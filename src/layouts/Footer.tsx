import { Col, Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row> 
                    <Col md={12}>
                        <div className="text-md-end footer-links d-none d-md-block">
                            <span>LiviSoft - Universidad Popular del Cesar  
                              - Desarrollado por: Ing. Holmes Elias Pinto Avila @2025</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}
