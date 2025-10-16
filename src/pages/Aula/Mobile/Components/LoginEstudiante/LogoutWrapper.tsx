import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
 
import { useAccountLayout } from '@/components/BGCircles';

// images
 
type AccountLayoutProps = {
	bottomLinks?: ReactNode;
	children?: ReactNode;
};

const LogoutWrapper = ({ bottomLinks,children }: AccountLayoutProps) => {
	useAccountLayout();
	return (
       		<><Container fluid className="p-0 ">
               
                   <Row className="justify-content-center cta-box" style={{height: "35rem", width: "52%", placeContent: "center space-evenly"}}
            >
                      <Col xs={12} sm={8} md={6} lg={4} className="text-center">
                          {children}
                          {bottomLinks}
                      </Col>
                  </Row>
             
              </Container></>
 
	);
};

export default LogoutWrapper;
