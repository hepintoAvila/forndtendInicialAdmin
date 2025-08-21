import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAccountLayout } from '@/components/BGCircles';

// images
import LogoDark from '@/assets/images/logo-dark.png';
import { config } from '@/common';
 
type AccountLayoutProps = {
	bottomLinks?: ReactNode;
	children?: ReactNode;
};

const AccountWrapper = ({ bottomLinks, children }: AccountLayoutProps) => {
	useAccountLayout();
 	return (
		<div className="auth-fluid">
			<div className="auth-fluid-form-box">
				<Card.Body className="d-flex flex-column h-100 gap-3">
					<div className="auth-brand text-center text-lg-start">
						
						<Link to={config.API_URL_WEB} className="logo-dark">
							<span>
								<img src={LogoDark} alt="" height={66} />
							</span>
						</Link>
						

					</div>

					<div className="my-auto">{children}</div>

					{bottomLinks}
				</Card.Body>
			</div>
		 
		 
			 
		</div>
	);
};

export default AccountWrapper;
