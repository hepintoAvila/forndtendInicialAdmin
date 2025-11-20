import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import google from '@/assets/images/google.png'
import facebook from '@/assets/images/facebook.png'
//import whatsapp from '@/assets/images/whatsapp.png'
import line from '@/assets/images/lineIz.png'
import { useAuth0 } from '@auth0/auth0-react';


const SocialLogin = () => {
	const { t } = useTranslation(); 
	const { loginWithRedirect} = useAuth0();

	return (
		<div className="text-center mt-4 bg-transparent ">
			<ul
				className="social-list d-flex flex-column align-items-center mt-3 "
				style={{ gap: '20px',width:'45rem' }}  // Espaciado vertical entre los botones
			>
				
				<li>
					<Link to="" className="social-list-item border-primary bg-primary h-5">
						<Button variant="purple" type="submit" className="d-flex align-items-center text-white " onClick={() => loginWithRedirect()}>
							<img className="google-icon text-center" width={50} src={google} alt="Google" />
							<div className="google-icon-text">{t('continúa con Google')}</div>
						</Button>
					</Link>
				</li>
				<li>
					<Link to="" className="social-list-item border-primary bg-primary ">
						<Button variant="purple" type="submit" className="d-flex align-items-center text-white " onClick={() => loginWithRedirect()}>
							<img className="facebook-icon text-center" src={facebook} alt="facebook" />
							<div className="facebook-icon-text">{t('continúa con Facebook')}</div>
						</Button>
					</Link>
				</li>			 
				 
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
