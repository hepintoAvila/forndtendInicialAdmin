import { Form, PasswordInput } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TextInputSinOnchange from '@/components/Form/TextInputSinOnchange';
import AccountWrapper from '@/pages/account/Login/AccountWrapper';
//import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { useNotificationContext } from '@/common';
import { useEffect } from 'react';
import LogoHeader from './Components/LogoHeader';

const LoginPaso2 = () => {
const { login,isAuthenticated } = useAuth();
const { t } = useTranslation();
const navigate = useNavigate();
const { showNotification } = useNotificationContext();
  useEffect(() => {
    if (isAuthenticated) {
        navigate('/aula/mobile', { replace: true });
    }
  }, [isAuthenticated, navigate]);
 
  const onSubmit = async (formData: { login: string; password: string }) => {
  // console.log('formData', formData);
   try {
      await login(formData);
   } catch (error) {
     showNotification({ message: 'Autenticación fallida', type: 'error' });
    }

  };
  
 
  return (
    <AccountWrapper>
      <Container fluid className="p-0">
        <LogoHeader menssage={'Ingresa tus datos para ver saldos de tu cuenta, asigna turnos de préstamos,registra tu visita en nuestras aulas.'}/>
        <Form onSubmit={onSubmit} defaultValues={{ login: '', password: '' }}>
        <Row className="justify-content-center">

          <Col xs={12} sm={8} md={6} lg={4} className="text-center" style={{marginTop: "-7rem", marginBottom: "2rem", marginLeft: "1rem"}}>

            
             
             
              <TextInputSinOnchange
                label={'Número de documento'}
                type="text"
                name="login"
                placeholder={t('Enter your email')}
                className="input-container-login w-100"
              />
              <PasswordInput
                label={'Contraseña'}
                name="password"
                placeholder={t('Enter your password')}
                 className="input-container-login w-100"
              >
 
              </PasswordInput>
              
            
          </Col>
        </Row>
        <Row className="justify-content-center" style={{marginLeft: "0.5rem"}}>
          <Col xs={12}>
          <Button

                type="submit"
                className="submit-button rounded-pill"
                style={{ maxWidth: '300px' }}
                //disabled={loading}
              >
                <i className="mdi mdi-login ms-0"></i> <small className="ms-3">{t('Log In')}</small>
              </Button>
          </Col>
        </Row>
        </Form>
      </Container>
    </AccountWrapper>
  );
};

export default LoginPaso2;