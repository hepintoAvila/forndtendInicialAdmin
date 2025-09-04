import { Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import RevenueChart from './RevenueChart';
import Programas from './Programas';
import SalesChart from './SalesChart';
import useReportes from '@/hooks/useReportes';
import { useEffect } from 'react';
 
import Footer from '@/layouts/Footer';
import NavBar from '../Landing/NavBar';
import Layouts from '../Landing/Layouts';
import { layouts } from '../Landing/data';
import ContactUs from '../Landing/ContactUs';
import { useNotificationContext } from '@/common';
import LayoutsEstadisticas from '../Landing/LayoutsEstadisticas';
import classnames from 'classnames';
 

const CRMDashboard = () => {
  const { showNotification } = useNotificationContext();
  const { sendReportsRequest, reportes, loading } = useReportes();

  useEffect(() => {
    sendReportsRequest();
  }, []);

  if (loading) {
    showNotification({ message: 'Cargando...', type: 'loading' });
  }
  const tabContents = [
    {
      id: '1',
      title: 'Virtualteca',
      icon: 'mdi mdi-home-variant',
      text: '',
    },
    {
      id: '2',
      title: 'Hemeroteca',
      icon: 'mdi mdi-account-circle',
      text: '',
    },
    {
      id: '3',
      title: 'Biblioteca',
      icon: 'mdi mdi-account-circle',
      text: '',
    },
  ];
  return (<>
     {reportes && Array.isArray(reportes) && reportes.length > 0 ? (
		<>
    <NavBar />
    <Layouts layouts={layouts} />
    <Tab.Container defaultActiveKey="Virtualteca">
        <Nav variant="tabs">
          {tabContents.map((tab, index) => {
            return (
              <Nav.Item key={index.toString()}>
                <Nav.Link eventKey={tab.title}>
                  <i
                    className={classnames(
                      tab.icon,
                      'd-md-none',
                      'd-block',
                      'me-1'
                    )}
                  ></i>
                  <span className="d-none d-md-block">{tab.title}</span>
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="Virtualteca">
            <div className="p-3">
              <Row>
                <Col lg={12}>
                  <Card>
                    <Card.Body>
                      <Statistics data={reportes} />
                      <Row>
                        <Col lg={5}>
                          <CampaignsChart data={reportes} />
                        </Col>
                        <Col lg={7}>
                          <RevenueChart data={reportes} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={8} lg={12}>
                          <Programas data={reportes} />
                        </Col>
                        <Col xl={4} lg={6}>
                          <SalesChart data={reportes} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container></>      
      ) : (
       <LayoutsEstadisticas layouts={layouts} /> 
      )}
      
      <ContactUs />
      <Footer />
    
  </> );
};

export { CRMDashboard };
