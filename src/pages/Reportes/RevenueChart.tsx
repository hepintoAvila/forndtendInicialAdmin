import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import { BuscadorContext } from './context/BuscadorContext';
import { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { v4 as uuidv4 } from 'uuid';
const RevenueChart = () => {
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
      name: 'Visitas',
      
      data: categorias?.map((categoria) => {
        const dato = datos.find((d) => d.turno_tipo === categoria);
        return dato ? dato.cantidad : 0;
      }),
    },
  ];

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
    labels: categorias,
    markers: {
      size: 0,
    },
    colors: ['#117a41', '#f6aa38', '#f6f601'],
    yaxis: [
      {
        title: {
          text: '% Visitas',
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
            return y.toFixed(0) + '';
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

  return (
    <Card>
      <Card.Body>
        
        <div className="chart-content-bg">
          {Array.isArray(series) && series?.length > 0 ? (
          <><Row>
              {categorias?.map((categoria, index) => {
                const dato = datos.find((d) => d.turno_tipo === categoria);
                return (
                  <Col sm={4} key={uuidv4()}>
                    <p className="text-muted mb-0 mt-3">
                      {categoria}
                    </p>
                    <h2 className="fw-normal mb-3">
                      <span>
                        {dato ? dato.cantidad : 0}
                      </span>
                    </h2>
                  </Col>
                );
              })}
            </Row><Row>
                <Col sm={6} key={1}>
                  <div dir="ltr">
                    <Chart
                      options={apexLineChartWithLables}
                      series={series}
                      type="line"
                      className="apex-charts"
                      height={321} />
                  </div>
                </Col>
                <Col sm={6} key={1}>
                  <div dir="ltr">
                    <ReactApexChart
                      className="apex-charts"
                      options={apexLineChartWithLables}
                      height={321}
                      series={series}
                      type="bar" />
                  </div>
                </Col>
              </Row></>
        ):''}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RevenueChart;