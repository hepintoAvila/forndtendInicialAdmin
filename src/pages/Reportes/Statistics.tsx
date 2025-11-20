import { Row, Col } from 'react-bootstrap';
import { StatisticsChartWidget } from '@/components';
import { Response} from './type';
import { v4 as uuidv4 } from 'uuid';
const Statistics = ({ data }: { data: Response }) => {
 

  return (
    <Row>
      {(data as unknown as any).slice(0, 4).map((reporte: any, index:number) => (
        <Col key={uuidv4()} md={6} xl={3}>
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