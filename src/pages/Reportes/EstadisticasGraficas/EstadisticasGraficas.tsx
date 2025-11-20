import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Statistics from '../Statistics';
import CampaignsChart from '../CampaignsChart';
import RevenueChart from '../RevenueChart';
import Programas from '../Programas';
import SalesChart from '../SalesChart';
import BuscadorProgramas from '../buscador/BuscadorProgramas';

interface DashboardProps {
  datos: any[];
}

const EstadisticasGraficas: React.FC<DashboardProps> = ({ datos }) => {
 
  return (
    <>
      <Statistics data={datos as any} />
      <Row>
        <Col lg={5}>
        {Array.isArray(datos) && datos?.length > 0 ? ( <CampaignsChart data={datos as any} />):'No existen datos'}
          
        </Col>
        <Col lg={7}>

          <BuscadorProgramas programas={datos[0]?.dataProgramas as any} />
           {Array.isArray(datos) && datos?.length > 0 ? ( <RevenueChart/>):'No existen datos'}
         
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={12}>
         {Array.isArray(datos) && datos?.length > 0 ? ( <Programas data={datos as any}/>):'No existen datos'}
        </Col>
        <Col xl={4} lg={6}>
         {Array.isArray(datos) && datos?.length > 0 ? (<SalesChart data={datos as any} />):'No existen datos'}
          
        </Col>
      </Row>
    </>
  );
};

export default EstadisticasGraficas;