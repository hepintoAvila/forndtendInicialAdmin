import { Row, Col } from 'react-bootstrap';
import { StatisticsChartWidget } from '@/components';
import { Reporte } from './type';
 
const Statistics = ({ data }: { data: Reporte }) => {
 

  return (
    <Row>
      {(data as unknown as Reporte[]).slice(0, 4).map((reporte, index) => (
        <Col key={index} md={6} xl={3}>
          <StatisticsChartWidget
            description={reporte.description}
            title={reporte.title}
            stats={reporte.stats}
            trend={reporte.trend}
            colors={reporte.colors}
            data={reporte.data.map(Number)} // Convertir strings a números
            type={index === 1 ? "line" : undefined}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Statistics;