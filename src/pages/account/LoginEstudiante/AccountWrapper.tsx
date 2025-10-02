import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
 
import { useAccountLayout } from '@/components/BGCircles';

// images
 
type AccountLayoutProps = {
	bottomLinks?: ReactNode;
	children?: ReactNode;
};

const AccountWrapperEstudinte = ({ bottomLinks, children }: AccountLayoutProps) => {
	useAccountLayout();
 	return (
		<div className="auth-fluid">
			 
				<Card.Body className="d-flex flex-column h-100 gap-3">
					<div className="my-auto">{children}</div>
					{bottomLinks}
				</Card.Body>
		 
		 
		 
			 
		</div>
	);
};

export default AccountWrapperEstudinte;
