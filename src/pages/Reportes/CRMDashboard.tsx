import { Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import useReportes from '@/hooks/useReportes';
import { useEffect } from 'react';
 
import Footer from '@/layouts/Footer';
import NavBar from '../Landing/NavBar';
import Layouts from '../Landing/Layouts';
import { layouts } from '../Landing/data';
import ContactUs from '../Landing/ContactUs';
 
import LayoutsEstadisticas from '../Landing/LayoutsEstadisticas';
import classnames from 'classnames';
import BuscadorForm from './buscador/BuscadorForm';
import useProgramas from "@/hooks/useProgramas"; 
import EstadisticasGraficas from './EstadisticasGraficas/EstadisticasGraficas';
import { ReporteServiceHistoResponse } from './type';

const CRMDashboard = () => {

  const { sendReportsRequest, reportes,visitas, loading,sendReportsHistoRequest,historicos } = useReportes();
  const {sendProgramasRequest,programas} = useProgramas();
  useEffect(() => {
    //
    sendReportsRequest();
     sendProgramasRequest();
  }, []);

   

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
      title: 'Historicos',
      icon: 'mdi mdi-account-circle',
      text: '',
    },
  ];
 

 
  const historicosArray:ReporteServiceHistoResponse = historicos.historicos;
 
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
    {tabContents.map((tab, index) => {
      return (
        <Tab.Pane key={index.toString()} eventKey={tab.title}>
          <div className="p-3">
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Body>
                    {/* Aquí puedes agregar contenido específico para cada pestaña */}
                    {tab.title === "Virtualteca" && (
                      <>
                        <EstadisticasGraficas datos={reportes as any} />
                          
                      </>
                    )}
                    {tab.title === "Hemeroteca" && (
                       <>
                         <EstadisticasGraficas datos={visitas as any} />
                      </>
                    )}
                    {tab.title === "Historicos" && (
                       <><div>Contenido de Biblioteca del 2017-2020</div>
                      <Row>
                      <Col xl={8} lg={12}>                   
                          <BuscadorForm programas={programas as any} sendReportsHistoRequest={sendReportsHistoRequest}/>
                      </Col> 
                       </Row>
                        {historicosArray && Array.isArray(historicosArray) && historicosArray.length > 0 ? (
                        <EstadisticasGraficas datos={historicosArray as any} />
                     ) : (
                        <p>No hay datos históricos disponibles.</p>
                     )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Tab.Pane>
      );
    })}
  </Tab.Content>
</Tab.Container></>      
      ) : (
       loading && (<LayoutsEstadisticas layouts={layouts} loading={loading}/>)
      )}
      
      <ContactUs />
      <Footer />
    
  </> );
};

export { CRMDashboard };
