import { Button } from 'react-bootstrap';

const ComputadorTable = ({ selectedComputador, changeState }: any) => {
  if (!selectedComputador) return null;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-success" style={{ height: '5px' }}>
            <th>{`${selectedComputador.tipo} No.`}</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-100 my-1" style={{ height: '5px' }}>
            <td>{selectedComputador.numero}</td>
            <td>
              <span className={`${selectedComputador.estado === 'Ocupado' ? 'text-danger' : 'text-black'}`}>
                {selectedComputador.estado}
              </span>
            </td>
            <td>
              {selectedComputador.estado === 'Ocupado' && (
                <Button
                  className={'position-relative mt-0 mb-4 button-rounded'}
                  type="submit"
                  onClick={() => changeState(selectedComputador.id_pc as number)}
                >
                  <i className="ri-link-unlink-m"></i>
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComputadorTable;