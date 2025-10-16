import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AccountWrapper from '@/pages/account/Login/AccountWrapper';
//import { useEffect } from 'react';
import { useAuth } from '@/hooks';

import { useEffect } from 'react';
import { WizardLogin } from './WizardLogin';
const Login = () => {

const { isAuthenticated } = useAuth();
const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/aula/mobile', { replace: true });
    }
  }, [isAuthenticated, navigate]);


  return (
    <AccountWrapper>
      <Container fluid className={`cta-box`}>
         
        <Row className="justify-content-center">

          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
             <WizardLogin />
          </Col>
        </Row>
      </Container>
    </AccountWrapper>
  );
};

export default Login;