import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
 
import { useAccountLayout } from '@/components/BGCircles';

// images
 
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
					<div className="my-auto">{children}</div>
					{bottomLinks}
				</Card.Body>
			</div>
		 
		 
			 
		</div>
	);
};

export default AccountWrapper;
