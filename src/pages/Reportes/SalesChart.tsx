import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

import { LibroVisitas, ReporteServiceResponse } from './type';
import getElemento from '@/common/helpers/getElementos';
 

const SalesChart = ({ data }: { data: ReporteServiceResponse }) => {
	
		const primerElemento: LibroVisitas = getElemento(data as any,0)!;
		const apexBarChartDataColors: any[] =  primerElemento?.dataColors ?? ['#117a41', '#8cce6b', '#f6f601','#f6aa38'];

	const apexDonutOpts: ApexOptions = {
		chart: {
			height: 340,
			type: 'donut',
		},
		colors: apexBarChartDataColors,
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
 
 
const apexDonutData: number[] =  primerElemento?.dataTotales ?? [1, 1, 1, 3];

	return (
		<Card>
			<Card.Body>

				<Chart
					options={apexDonutOpts}
					series={apexDonutData}
					type="donut"
					height={222}
					className="apex-charts mb-4 mt-4"
				/>

				<div className="chart-widget-list">
					{(data as unknown as LibroVisitas[]).slice(0, 4).map((reporte, index) => (
					<p>
						<i className="mdi mdi-square" style={{ color: `${apexBarChartDataColors[index]}` }}></i> <span className="p-5">{reporte.title}</span> 
						<span className="float-end">{reporte.stats}</span>
					</p>
					))}
				</div>
			</Card.Body>
		</Card>
	);
};

export default SalesChart;
