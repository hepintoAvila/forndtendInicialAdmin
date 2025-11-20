import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

import { LibroVisitas, ReporteServiceResponse } from './type';
import getElemento from '@/common/helpers/getElementos';
import { BuscadorContext } from './context/BuscadorContext';
import { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { v4 as uuidv4 } from 'uuid';

const SalesChart = ({ data }: { data: ReporteServiceResponse }) => {
	  const {
		programaSeleccionado,
		programas,
	  } = useContext(BuscadorContext)!;
	
	  const datos = programas?.filter((programa) => programa.PROG_NOMBRE === programaSeleccionado).map((programa) => ({
		  mes: programa.mes,
		  turno_tipo: programa.turno_tipo,
		  cantidad: parseInt(programa.cantidad),
		}));
	  const categorias = [...new Set(datos?.map((dato) => dato.turno_tipo))].sort((a, b) => parseInt(a) - parseInt(b));
	
	  const series = [
		{	  
		   data: categorias?.map((categoria) => {
			const dato = datos.find((d) => d.turno_tipo === categoria);
			return dato ? dato.cantidad : 0;
		  }),
		},
	  ];
		const primerElemento: LibroVisitas = getElemento(data as any,0)!;
		//console.log('primerElemento',series[0].data)
		const apexBarChartDataColors: any[] =  primerElemento?.dataColors ?? ['#117a41', '#8cce6b', '#f6f601','#f6aa38'];
    const BasicRadialBarOpt: ApexOptions = {
	chart: {
		height: 320,
		type: 'radialBar',
	},
	plotOptions: {
		radialBar: {
			hollow: {
				size: '70%',
			},
			track: {
				background: 'rgba(170,184,197, 0.2)',
			},
		},
	},
	colors: apexBarChartDataColors,
	series: series[0].data,
	labels: categorias,
};
	return (
		<Card>
			<Card.Body>

				<ReactApexChart
									className="apex-charts"
									options={BasicRadialBarOpt}
									height={320}
									series={BasicRadialBarOpt.series}
									type="radialBar"
								/>

				<div className="chart-widget-list">
					{(datos && datos?.length > 0) && (
					<div className="chart-widget-list">
						{datos.slice(0, 4).map((reporte, index) => {
						const categoriaIndex = categorias.indexOf(reporte.turno_tipo);
						return (
							<p key={uuidv4()}>
							<i className="mdi mdi-square" style={{ color: `${apexBarChartDataColors[categoriaIndex]}` }}></i> 
							<span className="p-5">{reporte.turno_tipo}</span> 
							<span className="float-end">{reporte.cantidad}</span>
							</p>
						);
						})}
					</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default SalesChart;
