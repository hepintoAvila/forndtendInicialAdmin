// EmptyTable.tsx

interface EmptyTableProps {
  mensaje: string;
}

const EmptyTable = ({ mensaje }: EmptyTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-success" style={{ height: '5px' }}>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-100 my-1" style={{ height: '5px' }}>
            <td>{mensaje}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmptyTable;