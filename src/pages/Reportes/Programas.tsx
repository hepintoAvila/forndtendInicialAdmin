import { Card } from 'react-bootstrap';
import { ReporteServiceResponse, LibroVisitas } from './type';
import getElemento from '@/common/helpers/getElementos';
import { Table } from '@/components';
const Programas =({ data }: { data: ReporteServiceResponse }) => {
	const ceroElemento: LibroVisitas = getElemento(data as any,0)!;

	const datosprogramas: any=  ceroElemento?.dataProgramas ?? [{
                        "PROG_NOMBRE": null,
                        "turno_tipo": "Tarde",
                        "cantidad": "1"
                    }];
   const columns:any = [
    {
      Header: 'Programas',
      accessor: 'PROG_NOMBRE',
      defaultCanSort: true,
    },
    {
      Header: 'Jornada',
      accessor: 'turno_tipo',
      defaultCanSort: true,
    }, {
      Header: 'Visitas',
      accessor: 'cantidad',
      defaultCanSort: true,
    }, {
      Header: 'Mes',
      accessor: 'mes',
      defaultCanSort: true,
    },
  ];
	return (
    <>
    <br />
    <br />
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="header-title">LISTA DE CONSULTAS POR PROGRAMAS</h4>
      </Card.Header>
      <Card.Body className="pt-0">
        {Array.isArray(datosprogramas) && datosprogramas.length > 0 ? (
          <Table
            columns={columns}
            data={datosprogramas}
            pageSize={10}
            sizePerPageList={[
              { text: '10', value: 10 },
              { text: '20', value: 20 },
              { text: '50', value: 50 },
            ]}
            isSortable={true}
            pagination={true}
            isSelectable={true}
            isSearchable={true}
            theadClass="table-light"
            searchBoxClass="mb-2" />
        ) : (
          <p>No hay Roles </p>
        )}
      </Card.Body>
    </Card></>
	);
};

export default Programas;
