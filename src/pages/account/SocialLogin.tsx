import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
//import google from '@/assets/images/google.png'
//import whatsapp from '@/assets/images/whatsapp.png'
import line from '@/assets/images/lineIz.png'
//import { useAuth0 } from '@auth0/auth0-react';


const SocialLogin = () => {
	const { t } = useTranslation(); 
	//const { loginWithRedirect} = useAuth0();

	return (
		<div className="text-center mt-4">
			<ul
				className="social-list d-flex flex-column align-items-center mt-3"
				style={{ gap: '20px' }}  // Espaciado vertical entre los botones
			>
				{/*
				<li>
					<Link to="" className="social-list-item border-primary text-primary">
						<Button variant="purple" type="submit" className="d-flex align-items-center" onClick={() => loginWithRedirect()}>
							<img className="google-icon text-center" src={google} alt="Google" />
							<div className="google-icon-text">{t('continúa con Google')}</div>
						</Button>
					</Link>
				</li>
				<li>
					<Link to="" className="social-list-item border-primary text-primary">
						<Button variant="purple" type="submit" className="d-flex align-items-center">
							<img className="whatsapp-icon" src={whatsapp} alt="WhatsApp" />
							<div className="whatsapp-icon-text">{t('continúa con Whatsapp')}</div>
						</Button>
					</Link>
				</li>
				*/}
				<li>
					<Link to="" className="social-list-item-line">
							<img className="line px-2 w-90" width={135} src={line} alt="line" /><div className="text-line">    {t('')}  </div><img className="line px-2 w-90" width={134} src={line} alt="line" />
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default SocialLogin;
