// EstudianteTable.tsx

interface EstudianteTableProps {
  estudiantes: any[];
}

const EstudianteTable = ({ estudiantes }: EstudianteTableProps) => {
  return (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr className="bg-success" style={{ height: '5px' }}>
                        <th>Nombres</th>
                        <th>Documento</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Programa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="w-100 my-1" style={{ height: '5px' }}>
                        <td>{estudiantes[0].nombres}</td><td>{estudiantes[0].documento}</td><td>{estudiantes[0].email}</td><td>{estudiantes[0].celular}</td><td>{estudiantes[0].programa}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  );
};

export default EstudianteTable;