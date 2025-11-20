import { Card } from 'react-bootstrap';
import { Table } from '@/components';
const ProgramasMeses =({ data,programaSeleccionado,mesSeleccionado}: { data: any,programaSeleccionado:string,mesSeleccionado:string }) => {
 
   const columns:any = [
    {
      Header: 'Programa',
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
        <h4 className="header-title">{`LISTA DE CONSULTAS DE ${programaSeleccionado} DEL MES ${mesSeleccionado}`}</h4>
      </Card.Header>
      <Card.Body className="pt-0">
        {Array.isArray(data) && data?.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={10}
            sizePerPageList={[
              { text: '10', value: 10 },
              { text: '20', value: 20 },
              { text: '50', value: 50 },
            ]}
            isSortable={true}
            pagination={true}
            isSelectable={true}
            isSearchable={false}
            theadClass="table-light"
            searchBoxClass="mb-2" />
        ) : (
          <p>No existen resgistros</p>
        )}
      </Card.Body>
    </Card></>
	);
};

export default ProgramasMeses;
