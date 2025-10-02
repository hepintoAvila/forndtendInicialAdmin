import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SocialLogin from '../SocialLogin';
import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import AccountWrapperEstudinte from './AccountWrapper';

const LoginEstudiante = () => {
  //const { showNotification } = useNotificationContext();
 
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

 

  return (
    <AccountWrapperEstudinte>
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
         
              <SocialLogin />
         
          </Col>
        </Row>
      </Container>
    </AccountWrapperEstudinte>
  );
};

export default LoginEstudiante;