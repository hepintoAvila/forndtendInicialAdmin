import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import { CardTitle } from '@/components';
import getElemento from '@/common/helpers/getElementos';
import { ChartWidgetData, Reporte } from './type';

const RevenueChart = ({ data }: { data: Reporte }) => {
	const ceroElemento: ChartWidgetData = getElemento(data as any,0)!;
	const primerElemento: ChartWidgetData = getElemento(data as any,1)!;
	const dosElemento: ChartWidgetData = getElemento(data as any,2)!;
	const tresElemento: ChartWidgetData = getElemento(data as any,3)!;

	const apexBarChartData: number[] =  primerElemento?.data ?? [1, 1, 1, 3];
	const dosData: number[] =  dosElemento?.data ?? [1, 1, 1, 3];
	const tresData: number[] =  tresElemento?.data ?? [1, 1, 1, 3];
 

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
					text: '% Prestamos',
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
			name: 'Visitas Mañana',
			type: 'area',
			data: apexBarChartData,
		},
		{
			name: 'Visitas Tarde',
			type: 'line',
			data: dosData,
		},{
			name: 'Visitas Nocturna',
			type: 'line',
			data: tresData,
		},
	];
const datos = ceroElemento?.dataMeses as unknown as [{ [key: string]: string }]??[{
                        "PROG_NOMBRE": "ADMINISTRACION DE EMPRESAS",
                        "mes": "0",
                        "turno_tipo": "Tarde",
                        "cantidad": "0"
                    }];
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
					<Row>
					 {Object.keys(datos[0]).map((mes, index) => (
						<Col sm={6} key={index}>
						<p className="text-muted mb-0 mt-3">
							{mes === "8" ? "Mes Anterior" : "Este Mes"}
						</p>
						<h2 className="fw-normal mb-3">
							<span>
							 {datos[0][mes]??'0.0'}
							</span>
						</h2>
						</Col>
					))}
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
