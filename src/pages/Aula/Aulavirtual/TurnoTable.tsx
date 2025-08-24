// TurnoTable.tsx

import { Table } from "@/components";
import { Link } from "react-router-dom";

interface TurnoTableProps {
  turnos: any[];

}

const TurnoTable = ({ turnos }: TurnoTableProps) => {
      const columns = [
        {
          Header: 'PC',
          accessor: 'numero',
          defaultCanSort: true,
        },
        {
          Header: 'Fecha Inicial',
          accessor: 'fecha_inicial',
          defaultCanSort: true,
        },
        {
          Header: 'fecha_final',
          accessor: 'fecha_final',
          defaultCanSort: true,
        },
        {
          Header: 'Action',
          accessor: 'id_turno',
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
      data={turnos}
      pageSize={1}
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

export default TurnoTable;