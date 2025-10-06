import { ReactNode } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
 
import { useAccountLayout } from '@/components/BGCircles';

// images
 
type AccountLayoutProps = {
	bottomLinks?: ReactNode;
	children?: ReactNode;
};

const LogoutWrapper = ({ bottomLinks,children }: AccountLayoutProps) => {
	useAccountLayout();
	///*style={{height: "26rem",display:"flex",flexWrap: "wrap",flexDirection: "row-reverse",alignContent: "center",justifyContent: "space-around"}}*/
 	return (
       		<><Container fluid className="p-0">
                         <div className="auth-fluid" style={{ marginTop: "-20rem" }}>
              <div className="logout-mobile">
                  <div className="text-center">
                      <h4 className="mt-0">{'Hasta pronto!'}</h4>
                      <p className="text-muted mb-4">{'Cerrando sesión...'}</p>
                      <p className="text-muted">{'Gracias por usar nuestro sistema'}</p>
                  </div>
                  <div className="logout-icon m-auto">
                      <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 161.2 161.2"
                          enableBackground="new 0 0 161.2 161.2"
                          xmlSpace="preserve"
                          style={{ width: '50px', height: '50px' }}>
                          <path
                              className="path"
                              fill="none"
                              stroke="#0acf97"
                              strokeMiterlimit={10}
                              d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4 c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5 c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z" />
                          <circle
                              className="path"
                              fill="none"
                              stroke="#0acf97"
                              strokeWidth={4}
                              strokeMiterlimit={10}
                              cx="80.6"
                              cy="80.6"
                              r="62.1" />
                          <polyline
                              className="path"
                              fill="none"
                              stroke="#0acf97"
                              strokeWidth={6}
                              strokeLinecap="round"
                              strokeMiterlimit={10}
                              points="113,52.8 74.1,108.4 48.2,86.4 " />
                          <circle
                              className="spin"
                              fill="none"
                              stroke="#0acf97"
                              strokeWidth={4}
                              strokeMiterlimit={10}
                              strokeDasharray="12.2175,12.2175"
                              cx="80.6"
                              cy="80.6"
                              r="73.9" />
                      </svg>
                  </div>
              </div>
          </div>
                  <Row className="justify-content-center">
                      <Col xs={12} sm={8} md={6} lg={4} className="text-center">
                          {children}
                          {bottomLinks}
                      </Col>
                  </Row>
              </Container></>
 
	);
};

export default LogoutWrapper;
