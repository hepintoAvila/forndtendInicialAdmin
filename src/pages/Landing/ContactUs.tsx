import { Form, PasswordInput, TextInput } from '@/components';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {  useNavigate } from 'react-router-dom';

import {useAuth} from '@/AuthService/AuthService';
import { useEffect } from 'react';
import { useNotificationContext } from '@/common/context/useNotificationContext';
import { User } from '@/AuthService/type';
import AccountWrapper from '../account/Login/AccountWrapper';

const BottomLink = () => {
 
	return (
		<Row className="mt-3">
			<Col className="text-center">
				<p className="text-muted">
				 {''}
				</p>
			</Col>
		</Row>
	);
};

export default function ContactUs() {
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
	console.log('Form Data:', formData);
	  const credentials: User = {
		login: formData.login,
		password: formData.password,
	  };
	  await login(credentials);
	} catch (error) {
	  showNotification({ message: 'Autenticación fallida', type: 'error' });
	}
  };

	return (
		<>
			 
			<AccountWrapper bottomLinks={<BottomLink />}>
				<div className="text-center w-75 m-auto">
					<h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
					<p className="text-muted mb-4">
						{t('Enter your username and password to access admin panel.')}
					</p>
				</div>

				  <Form onSubmit={onSubmit} defaultValues={{ login: '', password: '' }}>
					<Row>
						<Col>
							<TextInput
								name="login"
								label={t('Login ')}
								type="text"
								placeholder={t('Enter your login')}
								containerClass="mb-3"
							/>
						</Col>
					</Row>
					<PasswordInput
						label={t('Password')}
						name="password"
						placeholder={t('Enter your password')}
						containerClass="mb-3"
					>
				 
					</PasswordInput>

					{/* <CheckInput
            name="rememberme"
            type="checkbox"
            label="Remember me"
            containerClass="mb-3"
            defaultChecked
          /> */}

					<div className="mb-3 text-center">
						<Button variant="primary" type="submit" disabled={loading}>
							{t('Log In')}
						</Button>
					</div>
				</Form>
			</AccountWrapper>
		</>
	);
}
