import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks';
//import whatsapp from '@/assets/images/whatsapp.png'
//import { useAuth0 } from '@auth0/auth0-react';


const SocialLogout = () => {
	const { t } = useTranslation(); 
	const { logout, isAuthenticated } = useAuth();

  	const navigate = useNavigate();
	const handleLogin = async () => {
		await logout();
		navigate('/aula/login', { replace: true });
		};
 

	return (<>
		<div className="text-center mt-4 bg-transparent ">
			<ul
				className="social-list d-flex flex-column align-items-center mt-3 "
				style={{ gap: '20px',width:'45rem' }}  // Espaciado vertical entre los botones
			>
				
				<li>
					<Link to="" className="social-list-item border-primary bg-primary h-5">
						<Button variant="purple" type="submit" className="submit-button rounded-pill" onClick={handleLogin}>
							<div className="google-icon-text">{isAuthenticated ? t('Cerrar sesión') : t('continúa con Google')}</div>
						</Button>
					</Link>
				</li>			 
			</ul>
		</div>
	</>);
};

export default SocialLogout;