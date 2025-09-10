import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Statistics from '../Statistics';
import CampaignsChart from '../CampaignsChart';
import RevenueChart from '../RevenueChart';
import Programas from '../Programas';
import SalesChart from '../SalesChart';

interface DashboardProps {
  datos: any[];
}

const EstadisticasGraficas: React.FC<DashboardProps> = ({ datos }) => {
  return (
    <>
      <Statistics data={datos as any} />
      <Row>
        <Col lg={5}>
          <CampaignsChart data={datos as any} />
        </Col>
        <Col lg={7}>
          <RevenueChart data={datos as any} />
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={12}>
          <Programas data={datos as any} />
        </Col>
        <Col xl={4} lg={6}>
          <SalesChart data={datos as any} />
        </Col>
      </Row>
    </>
  );
};

export default EstadisticasGraficas;