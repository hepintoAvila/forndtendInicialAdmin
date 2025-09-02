import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import { CardTitle } from '@/components';

const CampaignsChart = () => {
	const apexBarChartOpts: ApexOptions = {
		grid: {
			padding: {
				left: 0,
				right: 0,
			},
		},
		chart: {
			height: 320,
			type: 'radialBar',
		},
		colors: ['#117a41', '#8cce6b', '#f6f601','#f6aa38'],
		labels: ['Mañana', 'Tarde', 'Nocturna', 'Total'],
		plotOptions: {
			radialBar: {
				track: {
					margin: 8,
				},
			},
		},
	};

	const apexBarChartData: number[] = [86, 36, 50,72];

	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between mb-1"
					title="Visitas por Semanas"
					menuItems={[
						{ label: 'Today' },
						{ label: 'Yesterday' },
						{ label: 'Last Week' },
						{ label: 'Last Month' },
					]}
				/>

				<Chart
					options={apexBarChartOpts}
					series={apexBarChartData}
					type="radialBar"
					className="apex-charts"
					height={302}
				/>

				<Row className="text-center mt-3 mb-4">
					<Col sm={3}>
						<i className="mdi mdi-flag-variant widget-icon rounded-circle bg-light-lighten text-muted"></i>
						<h3 className="fw-normal mt-3">
							<span>6,510</span>
						</h3>
						<p className="text-muted mb-0 mb-2">
							<i className="mdi mdi-checkbox-blank-circle" style={{ color: '#42a542' }}></i> <span className="p-5">Manaña</span> 
						</p>
					</Col>
					<Col sm={3}>
						<i className="mdi mdi-flag-variant widget-icon rounded-circle bg-light-lighten text-muted"></i>
						<h3 className="fw-normal mt-3">
							<span>3,487</span>
						</h3>
						<p className="text-muted mb-0 mb-2">
							<i className="mdi mdi-checkbox-blank-circle" style={{ color: '#117a41' }}></i> <span className="p-5">Tarde</span> 
						</p>
					</Col>
					<Col sm={3}>
						<i className="mdi mdi-flag-variant widget-icon rounded-circle bg-light-lighten text-muted"></i>
						<h3 className="fw-normal mt-3">
							<span>1,568</span>
						</h3>
						<p className="text-muted mb-0 mb-2">
							<i className="mdi mdi-checkbox-blank-circle" style={{ color: '#8cce6b' }}></i> <span className="p-5">Nocturna</span> 
						</p>
					</Col>
					<Col sm={3}>
						<i className="mdi mdi-flag-variant widget-icon rounded-circle bg-light-lighten text-muted"></i>
						<h3 className="fw-normal mt-3">
							<span>1,568</span>
						</h3>
						<p className="text-muted mb-0 mb-2">
							<i className="mdi mdi-checkbox-blank-circle" style={{ color: '#f6aa38' }}></i> <span className="p-5">Total</span> 
						</p>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default CampaignsChart;
