import { Row, Col } from 'react-bootstrap';
import { StatisticsChartWidget } from '@/components';

const Statistics = () => {
	return (
		<Row>
			<Col md={6} xl={3}>
				<StatisticsChartWidget
					description="Visitas Aulavirtual"
					title="Aulavirtual"
					stats="9,184"
					trend={{
						textClass: 'text-success',
						icon: 'mdi mdi-arrow-up-bold',
						value: '3.27%',
					}}
					colors={['#d4212c']}
					data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
				></StatisticsChartWidget>
			</Col>
			<Col md={6} xl={3}>
				<StatisticsChartWidget
					description="Mañana"
					title="Mañana"
					stats="3,254"
					trend={{
						textClass: 'text-danger',
						icon: 'mdi mdi-arrow-down-bold',
						value: '5.38%',
					}}
					colors={['#f6aa38']}
					type="line"
					data={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}
				></StatisticsChartWidget>
			</Col>
			<Col md={6} xl={3}>
				<StatisticsChartWidget
					description="Tarde"
					title="Tarde"
					stats="861"
					trend={{
						textClass: 'text-success',
						icon: 'mdi mdi-arrow-up-bold',
						value: '4.87%',
					}}
					colors={['#2f9dd8']}
					data={[12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]}
				></StatisticsChartWidget>
			</Col>
			<Col md={6} xl={3}>
				<StatisticsChartWidget
					description="Nocturna"
					title="Nocturna"
					stats="253"
					trend={{
						textClass: 'text-success',
						icon: 'mdi mdi-arrow-up-bold',
						value: '11.7%',
					}}
					colors={['#a43ac1']}
					data={[47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]}
				></StatisticsChartWidget>
			</Col>
		</Row>
	);
};

export default Statistics;
