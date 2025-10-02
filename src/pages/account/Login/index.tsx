import { Form, PasswordInput } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SocialLogin from '../SocialLogin';
import TextInputSinOnchange from '@/components/Form/TextInputSinOnchange';
import LogoDark from '@/assets/images/logo-dark.jpg';
import AccountWrapper from '@/pages/account/Login/AccountWrapper';
import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { useNotificationContext } from '@/common';

const Login = () => {
  const { showNotification } = useNotificationContext();
  const { t } = useTranslation();
  const { isAuthenticated, login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (formData: { login: string; password: string }) => {
    try {
      await login(formData);
    } catch (error) {
      showNotification({ message: 'Autenticación fallida', type: 'error' });
    }
  };

  return (
    <AccountWrapper>
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
            <img src={LogoDark} alt="" height={100} className="mt-0" />
            <h4 className="mt-3 text-bold">{t('LiviSoft')}</h4>
            <h4 className="mt-0 text-bold" style={{ width: 'max-content', marginLeft: '-4rem' }}>{t('Universidad Popular del Cesar')}</h4>
            <Form onSubmit={onSubmit} defaultValues={{ login: '', password: '' }}>
              <TextInputSinOnchange
                label={''}
                type="text"
                name="login"
                placeholder={t('Enter your email')}
                className="input-container-login w-100"
              />
              <PasswordInput
                label={''}
                name="password"
                placeholder={t('Enter your password')}
                 className="input-container-login w-50"
              >
 
              </PasswordInput>
              <Button
                variant="primary"
                type="submit"
                className="mb-3 input-container-login w-100"
                style={{ maxWidth: '300px' }}
                disabled={loading}
              >
                <i className="mdi mdi-login ms-0"></i> <small className="ms-3">{t('Log In')}</small>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </AccountWrapper>
  );
};

export default Login;