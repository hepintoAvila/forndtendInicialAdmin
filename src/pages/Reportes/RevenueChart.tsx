import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import { CardTitle } from '@/components';

const RevenueChart = () => {
	const apexLineChartWithLables: ApexOptions = {
		chart: {
			height: 336,
			type: 'line',
			toolbar: {
				show: false,
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		fill: {
			type: 'solid',
			opacity: [0.35, 1],
		},
		labels: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		markers: {
			size: 0,
		},
		colors: ['#117a41', '#f6aa38', '#f6f601'],
		yaxis: [
			{
				title: {
					text: 'Revenue (USD)',
				},
				min: 0,
			},
		],
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: function (y) {
					if (typeof y !== 'undefined') {
						return y.toFixed(0) + 'k';
					}
					return y;
				},
			},
		},
		grid: {
			borderColor: '#f1f3fa',
		},
		legend: {
			fontSize: '14px',
			fontFamily: '14px',
			offsetY: -10,
		},
		responsive: [
			{
				breakpoint: 600,
				options: {
					yaxis: {
						show: false,
					},
					legend: {
						show: false,
					},
				},
			},
		],
	};

	const apexLineChartWithLablesData = [
		{
			name: 'Total Visitas Mañana',
			type: 'area',
			data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33, 43],
		},
		{
			name: 'Total Visitas Tarde',
			type: 'line',
			data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43, 56],
		},{
			name: 'Total Visitas Nocturna',
			type: 'line',
			data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43, 56],
		},
	];

	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between mb-3"
					title="Visitas por Mes"
					menuItems={[
						{ label: 'Today' },
						{ label: 'Yesterday' },
						{ label: 'Last Week' },
						{ label: 'Last Month' },
					]}
				/>

				<div className="chart-content-bg">
					<Row className="text-center">
						<Col sm={6}>
							<p className="text-muted mb-0 mt-3">Este Mes</p>
							<h2 className="fw-normal mb-3">
								<span>42</span>
							</h2>
						</Col>
						<Col sm={6}>
							<p className="text-muted mb-0 mt-3">Mes Anterior </p>
							<h2 className="fw-normal mb-3">
								<span>74</span>
							</h2>
						</Col>
					</Row>
				</div>

				<div dir="ltr">
					<Chart
						options={apexLineChartWithLables}
						series={apexLineChartWithLablesData}
						type="line"
						className="apex-charts"
						height={321}
					/>
				</div>
			</Card.Body>
		</Card>
	);
};

export default RevenueChart;
