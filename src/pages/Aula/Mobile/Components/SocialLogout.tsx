import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//import whatsapp from '@/assets/images/whatsapp.png'
import { useAuth0 } from '@auth0/auth0-react';


const SocialLogout = () => {
	const { t } = useTranslation(); 
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

		const handleLogin = () => {
			if (isAuthenticated) {
				logout({ logoutParams: { returnTo: 'https://biblioteca.unicesar.edu.co/mobile/#/aula/login/callback'} });
			} else {
				loginWithRedirect();
			}
		};

	return (<>
		<div className="text-center mt-4 bg-transparent ">
			<ul
				className="social-list d-flex flex-column align-items-center mt-3 "
				style={{ gap: '20px',width:'45rem' }}  // Espaciado vertical entre los botones
			>
				
				<li>
					<Link to="" className="social-list-item border-primary bg-primary h-5">
						<Button variant="purple" type="submit" className="d-flex align-items-center text-white " onClick={handleLogin}>
							<div className="google-icon-text">{isAuthenticated ? t('Cerrar sesión') : t('continúa con Google')}</div>
						</Button>
					</Link>
				</li>			 
			</ul>
		</div>
	</>);
};

export default SocialLogout;