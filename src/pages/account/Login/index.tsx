import { Form, PasswordInput } from '@/components';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLogin, { loginFormSchema } from './useLogin';
import { Button } from 'react-bootstrap';
import SocialLogin from '../SocialLogin';
import TextInputSinOnchange from '@/components/Form/TextInputSinOnchange';
import LogoDark from '@/assets/images/logo-dark.png';
import AccountWrapper from '@/pages/account/Login/AccountWrapper';

const Login = () => {
	const { t } = useTranslation();
	const { loading, login, redirectUrl, isAuthenticated } = useLogin();
	
	// Manejador de envío de formulario
	const onSubmit = async (formData: { login: string; password: string ; }) => {
		try {
			
			await login(formData);
		} catch (error) {
			console.error('Login failed:', error);
		}
	};
	sessionStorage.setItem('logoutRedirectPath', '/account/login');
	return (
		<>
			{isAuthenticated && <Navigate to={redirectUrl} replace />}
			
			<AccountWrapper>
			<div className="text-center mt-0">
					<span>
						<img src={LogoDark} alt="" height={100} />
					</span>
				<h4 className="mt-0 text-center text-bold" >{t('Inicia sesión')}</h4>
				 
	      		 <Form
					onSubmit={onSubmit}
					schema={loginFormSchema}
					defaultValues={{ login: '', password: '' }}
				>
					<SocialLogin />
	 
					<TextInputSinOnchange
						label={''}
						type="text"
						name="login"
						placeholder={t('Enter your email')}
						className="input-container-login text-center " // Padding y tamaño del texto
					/>
					<PasswordInput
						label={''}
						name="password"
						placeholder={t('Enter your password')}
						className="input-container-password text-center"
					>
						<Link to="/account/forget-password2" className="text-muted float-end">
							<small>{t('Forgot your password?')}</small>
						</Link>
					</PasswordInput>
							
				<Button variant="primary" type="submit" disabled={loading} className="mb-3 input-container-login">
					<i className="mdi mdi-login ms-0"></i> <small className="ms-3">{t('Log In')}</small>
				</Button>
				</Form>
				</div>
			</AccountWrapper>
		</>
	);
};

export default Login;
