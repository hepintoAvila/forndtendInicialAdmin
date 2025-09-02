import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';
import { CardTitle } from '@/components';

const SalesChart = () => {
	const apexDonutOpts: ApexOptions = {
		chart: {
			height: 340,
			type: 'donut',
		},
		colors: ['#42a542', '#117a41', '#8cce6b', '#f6f601'],
		legend: {
			show: false,
		},
		responsive: [
			{
				breakpoint: 376,
				options: {
					chart: {
						width: 250,
						height: 250,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
	};

	const apexDonutData = [44, 55, 41, 17];

	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between"
					title="Total Visitas"
					menuItems={[
						{ label: 'Sales Report' },
						{ label: 'Export Report' },
						{ label: 'Profit' },
						{ label: 'Action' },
					]}
				/>

				<Chart
					options={apexDonutOpts}
					series={apexDonutData}
					type="donut"
					height={222}
					className="apex-charts mb-4 mt-4"
				/>

				<div className="chart-widget-list">
					<p>
						<i className="mdi mdi-square" style={{ color: '#42a542' }}></i> <span className="p-5">Manaña</span> 
						<span className="float-end">300.56</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#117a41' }}></i>  <span className="p-5">Tarde</span> 
						<span className="float-end">135.18</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#8cce6b' }}></i> <span className="p-5">Nocturna</span> 
						<span className="float-end">48.96</span>
					</p>
					<p className="mb-0">
						<i className="mdi mdi-square" style={{ color: '#f6f601' }}></i> <span className="p-5">Totales</span>
						<span className="float-end">154.02</span>
					</p>
				</div>
			</Card.Body>
		</Card>
	);
};

export default SalesChart;
