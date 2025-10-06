import { Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import useReportes from '@/hooks/useReportes';
import { useEffect, useState } from 'react';

import Footer from '@/layouts/Footer';
import NavBar from '../Landing/NavBar';
import { layouts } from '../Landing/data';
import ContactUs from '../Landing/ContactUs';

import LayoutsEstadisticas from '../Landing/LayoutsEstadisticas';
import classnames from 'classnames';
import BuscadorForm from './buscador/BuscadorForm';
import useProgramas from "@/hooks/useProgramas";
import EstadisticasGraficas from './EstadisticasGraficas/EstadisticasGraficas';
import FooterMobile from '@/pages/Aula/Mobile/Components/FooterMobile';
import { useViewport } from '@/hooks';
import ContactUsMobile from '../Landing/ContactUsMobile';


const CRMDashboard = () => {
  
  const { width } = useViewport();
  const [activeTab, setActiveTab] = useState('Virtualteca');
  const [estadisticas, setEstadisticas] = useState({
    Virtualteca: '' as any,
    Hemeroteca: '' as any,
    Historicos: '' as any,
  });

  const { sendReportsRequest, reportes, visitas, loading, sendReportsHistoRequest, historicos } = useReportes();
  const { sendProgramasRequest, programas } = useProgramas();

  useEffect(() => {
    sendProgramasRequest();
  }, []);

  const handleTabChange = (tab: string | null) => {
    
    if (!tab) return;
    if (tab !== 'Virtualteca' && tab !== 'Hemeroteca' && tab !== 'Historicos') return;
    setActiveTab(tab);
     
      switch (tab) {
        case 'Virtualteca':
         
          sendReportsRequest();
          break;
        case 'Hemeroteca':
          // Cargar estadísticas de Hemeroteca
          break;
        case 'Historicos':
          sendReportsHistoRequest({});
          break;
        default:
          break;
      }
    
  };

  useEffect(() => {
    if (reportes && activeTab === 'Virtualteca') {
      setEstadisticas((prevEstadisticas) => ({ ...prevEstadisticas, Virtualteca: reportes }));
    }
    if (visitas && activeTab === 'Hemeroteca') {
      setEstadisticas((prevEstadisticas) => ({ ...prevEstadisticas, Hemeroteca: visitas }));
    }
    if (historicos && activeTab === 'Historicos') {
      setEstadisticas((prevEstadisticas) => ({ ...prevEstadisticas, Historicos: historicos }));
    }
  }, [reportes, visitas, historicos, activeTab]);

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
 
  //const historicosArray: ReporteServiceHistoResponse = historicos?.historicos;

  return (
   
  <>
   
      <>
  
        <NavBar />
     
        <Tab.Container defaultActiveKey="Virtualteca" onSelect={handleTabChange}>
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
           {reportes && Array.isArray(reportes) && reportes.length > 0 ? (
          <Tab.Content>
            {tabContents.map((tab, index) => {
              return (
                <Tab.Pane key={index.toString()} eventKey={tab.title}>
                  <div className="p-3">
                    <Row>
                      <Col lg={12}>
                        <Card>
                          <Card.Body>
                            {activeTab === tab.title && (
                              <>
                                {tab.title === "Virtualteca" && estadisticas.Virtualteca && (
                                  <EstadisticasGraficas datos={estadisticas.Virtualteca as any} />
                                )}
                                {tab.title === "Hemeroteca" && estadisticas.Hemeroteca && (
                                  <EstadisticasGraficas datos={estadisticas.Hemeroteca as any} />
                                )}
                                {tab.title === "Historicos" && (
                                  <>
                                    <div>Contenido de Biblioteca del 2017-2020</div>
                                    <Row>
                                      <Col xl={8} lg={12}>
                                        <BuscadorForm programas={programas as any} sendReportsHistoRequest={sendReportsHistoRequest} />
                                      </Col>
                                    </Row>
                                    {estadisticas.Historicos && Array.isArray(estadisticas.Historicos) && estadisticas.Historicos.length > 0 ? (
                                      <EstadisticasGraficas datos={estadisticas.Historicos as any} />
                                    ) : (
                                      <p>No hay datos históricos disponibles.</p>
                                    )}
                                  </>
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
          </Tab.Content>) : (
      loading && (<LayoutsEstadisticas layouts={layouts} loading={loading} />)
    )}
        </Tab.Container>
      </>
   
  </>
);
};

export { CRMDashboard };
