import { Container, Row, Col } from 'react-bootstrap';
import { LayoutDemo } from './types';
import logoDark from '@/assets/images/logo-dark.png';

type LayoutsProps = {
    layouts: LayoutDemo[];
    loading: boolean;
};

const LayoutsEstadisticas = ({ layouts, loading }: LayoutsProps) => {
    //showNotification({ message: 'Cargando...', type: 'loading' });

    return (
        <section className="py-5 bg-light-lighten border-top border-bottom border-light">
            <div
                className="preloader"
                id="preloader"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: loading ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: loading ? 1 : 0,
                }}>

                <Container>
                    <Row>
                        <Col lg={5}></Col>
                        <Col lg={2} className="text-center">
                            {' '}
                            <div className="logo-light">
                                <img src={logoDark} alt="React logo"  className="logo-girar" width={200} />
                            </div>
                        </Col>
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
                <div
                    className="bouncing-loader"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, 50%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100px',
                    }}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </section>
    );
};

export default LayoutsEstadisticas;
