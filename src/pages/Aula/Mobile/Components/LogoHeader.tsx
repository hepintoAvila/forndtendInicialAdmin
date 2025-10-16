
import { Row, Col } from 'react-bootstrap';
import LogoDark from '@/assets/images/logo-dark-png.png';

interface LogoHeaderProps {
  menssage: string;
}

const LogoHeader = ({ menssage }: LogoHeaderProps) => {
  return (
    <Row className="justify-content-center mb-4 bg-transparent">
      <Col xs={12} sm={8} md={6} lg={4} className="text-center logo-header">
        <img src={LogoDark} alt="" height={100} className="mt-0 logo-image" />
        <h4 className="mt-3 text-bold logo-title">{('LiviSoft')}</h4>
        <h4 className="mt-3 text-bold logo-subtitle">{('Universidad Popular del Cesar')}</h4>
        <h4 className="mt-3 text-bold">¡Te damos la bienvenida!</h4> 
        <p>{menssage}</p>
      </Col>
    </Row>
  );
};

export default LogoHeader;