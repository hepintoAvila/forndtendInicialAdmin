// AccountReloj.js
import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
 
type AccountLayoutProps = {
    children?: ReactNode;
};

const AccountReloj = ({ children }: AccountLayoutProps) => {
    return (
        <div className="container text-center">
            <div className="auth-fluid-form-box">
                <Card.Body className="d-flex flex-column h-100 gap-3">
                    <div className="auth-brand text-center text-lg-start">
                        <div>
                            <span>{children}</span>
                        </div>
                    </div>
                </Card.Body>
            </div>
        </div>
    );
};

export default AccountReloj;
