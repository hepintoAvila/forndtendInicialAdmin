import { useState } from 'react';
import { Button } from 'react-bootstrap';

const ComputadorTable = ({ selectedComputador, changeState,pcLibres }: any) => {
  if (!selectedComputador) return null;
  const [idPcLibre, setIdPcLibre] = useState(0);

  const handleSelectPcLibre = (idPc: number) => {
    setIdPcLibre(idPc);
  };
  function getEstadoClase(estado: any) {
    switch (estado) {
      case 'Libre':
        return 'text-success';
      case 'Ocupado':
        return 'text-danger';
      case 'Pendiente':
        return 'text-warning';
      default:
        return '';
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-success" style={{ height: '5px' }}>
            <th>PC No.</th>
            <th>Estado</th>
            <th>Pc disponibles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-100 my-1" style={{ height: '5px' }}>
            <td>{selectedComputador.numero}</td>
            <td>
              <span className={getEstadoClase(selectedComputador.estado)}>
                {selectedComputador.estado}
              </span>
            </td>
          <td>
            {(selectedComputador.estado === 'Pendiente') && (
              <select
                className="form-select"
                onChange={(e) => handleSelectPcLibre(e.target.value as unknown as number)}
              >
                <option value="">Seleccione un PC libre</option>
                {pcLibres?.map((pc: any) => (
                  <option key={pc.id_pc} value={pc.id_pc}>
                    {pc.numero}
                  </option>
                ))}
              </select>
            )}
          </td>
            <td>
              {(selectedComputador.estado === 'Ocupado' || selectedComputador.estado === 'Pendiente') && (
                <Button
                  className={'position-relative mt-0 mb-4 button-rounded'}
                  type="submit"
                  onClick={() => changeState(selectedComputador.id_pc as number, idPcLibre as number,selectedComputador.estado)}
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