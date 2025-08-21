import { Col, Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row> 
                    <Col md={6}>
                        <div className="text-md-end footer-links d-none d-md-block"></div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}
