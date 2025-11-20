// TurnoTable.tsx

import { Visita } from "@/common/type/type._visitas";
import { Table } from "@/components";
import { Link } from "react-router-dom";

interface VisitasTableProps {
  visitas: Visita[];

}

const VisitasTable = ({ visitas }: VisitasTableProps) => {
      const columns = [
        {
          Header: 'identificacion',
          accessor: 'identificacion',
          defaultCanSort: true,
        },
        {
          Header: 'Programa',
          accessor: 'programa',
          defaultCanSort: true,
        },
        {
          Header: 'Tipo Visita',
          accessor: 'tipo_visita',
          defaultCanSort: true,
        },{
          Header: 'Jornada',
          accessor: 'jornada',
          defaultCanSort: true,
        },{
          Header: 'Fecha Visita',
          accessor: 'fecha_creacion',
          defaultCanSort: true,
        },
        {
          Header: 'Action',
          accessor: 'id_visita',
          defaultCanSort: false,
          Cell: ({ row }: { row: any }) => (
            <>
              <Link to="" className="action-icon" >
                <i className="mdi mdi-delete"></i>
              </Link>
            </>
          ),
        },
      ];
  return (
    <Table
      columns={columns}
      data={visitas}
      pageSize={15}
      sizePerPageList={[
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '10', value: 10 },
      ]}
      isSortable={true}
      pagination={true}
      isSelectable={true}
      isSearchable={true}
      theadClass="table-light"
      searchBoxClass="mb-2"
    />
  );
};

export default VisitasTable;