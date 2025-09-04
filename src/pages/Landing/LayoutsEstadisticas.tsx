import { Container, Row, Col } from 'react-bootstrap';
import { LayoutDemo } from './types';
import logoDark from '@/assets/images/logo-dark.jpg';
type LayoutsProps = {
    layouts: LayoutDemo[];
};

const LayoutsEstadisticas = ({ layouts }: LayoutsProps) => {
    return (
        <section className="py-5 bg-light-lighten border-top border-bottom border-light">
            <Container>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Row>
<Col lg={5}></Col>
<Col lg={2}>  <div className="logo-light">
                                <img src={logoDark} className="logo upc" alt="React logo" width={200} />
                            </div></Col>
<Col lg={5}></Col>

				</Row>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                          
                            <h3>
                                Cargando las{' '}
                                <span className="text-primary">Estadísticas de Visitas de la Biblioteca...</span>
                            </h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LayoutsEstadisticas;
