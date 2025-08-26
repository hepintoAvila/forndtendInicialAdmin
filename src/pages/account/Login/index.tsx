import { Form, PasswordInput } from '@/components';
import { Link,useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
 
import { Button } from 'react-bootstrap';
import SocialLogin from '../SocialLogin';
import TextInputSinOnchange from '@/components/Form/TextInputSinOnchange';
import LogoDark from '@/assets/images/logo-dark.jpg';
import AccountWrapper from '@/pages/account/Login/AccountWrapper';
 
import { useEffect } from 'react';
import { useAuth } from '@/hooks';

const Login = () => {
	const { t } = useTranslation();
  const { isAuthenticated, login, loading} = useAuth();
  const navigate = useNavigate();
 
   //console.log('', isAuthenticated, 'isAuthenticated en Login');
  // Redirigir solo si está autenticado y no estamos ya en la página de dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);
	  
 
 
	// Manejador de envío de formulario
	const onSubmit = async (formData: { login: string; password: string ; }) => {
		try {
			await login(formData);
		} catch (error) {
			console.error('Login failed:', error);
		}
	};
	return (
		<>
		
			
			<AccountWrapper>
			<div className="text-center mt-0">
					<span>
						<img src={LogoDark} alt="" height={100} />
					</span>
				<h4 className="mt-3 text-center text-bold" >{t('LiviSoft')}</h4>
				<h4 className="mt-0 text-center text-bold" >{t('Universidad Popular del Cesar')}</h4>
				 
	      		 <Form
					onSubmit={onSubmit}
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
							
				<Button variant="primary" type="submit" className="mb-3 input-container-login"  disabled={loading}>
					<i className="mdi mdi-login ms-0"></i> <small className="ms-3">{t('Log In')}</small>
				</Button>
				</Form>
				</div>
			</AccountWrapper>
		</>
	);
};

export default Login;
