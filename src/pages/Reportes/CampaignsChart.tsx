import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
 
import getElemento from '@/common/helpers/getElementos';
import { ReporteServiceResponse,LibroVisitas } from './type';
 
const CampaignsChart = ({ data }: { data: ReporteServiceResponse }) => {
	const primerElemento: LibroVisitas = getElemento(data as any,0)!;
	const apexBarChartDataColors: any[] =  primerElemento?.dataColors ?? ['#117a41', '#8cce6b', '#f6f601','#f6aa38'];
	
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
		colors: apexBarChartDataColors,
		labels: ['Mañana', 'Tarde', 'Nocturna', 'Total'],
		plotOptions: {
			radialBar: {
				track: {
					margin: 8,
				},
			},
		},
	};
 
	const apexBarChartData: number[] =  primerElemento?.dataTotales ?? [1, 1, 1, 3];
	return (
		<Card>
			<Card.Body>
				<Chart
					options={apexBarChartOpts}
					series={apexBarChartData}
					type="radialBar"
					className="apex-charts"
					height={302}
				/>
				<Row className="text-center mt-3 mb-4">
					{(data as unknown as LibroVisitas[]).slice(0, 4).map((reporte, index) => (

					<Col sm={3}>
						<i className="mdi mdi-flag-variant widget-icon rounded-circle bg-light-lighten text-muted"></i>
						<h3 className="fw-normal mt-3">
							<span>{reporte.stats}</span>
						</h3>
						<p className="text-muted mb-0 mb-2">
							<i className="mdi mdi-checkbox-blank-circle" style={{ color: `${reporte.colors}` }}></i> <span className="p-5">{reporte.title}</span> 
						</p>
					</Col>
					))}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default CampaignsChart;
