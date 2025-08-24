

import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { Pc } from "./type";
import { ApiTurnoResponseData } from "@/common/type/type._turnos";

import { Link } from "react-router-dom";
import ComputadorCard from "./ComputadorCard";
import EstudianteTable from "./EstudianteTable";
import TurnoTable from "./TurnoTable";
import EmptyTable from "./EmptyTable";
import PrestamoForm from "./PrestamoForm";
const SidebarPcs = ({
  turnos,
  computadores,
  documentoAnterior,
  estudiantes,
  handleShowModal,
  handleCloseModal,
  handleSubmit,
  showModal,
  selectedComputador,
  handleDocumentoChange
}: {
  turnos: ApiTurnoResponseData;
  computadores: Pc[];
  documentoAnterior: any;
  estudiantes: any;
  handleShowModal: (computador: Pc) => void;
  handleDocumentoChange: (arg: string) => void;
  handleCloseModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  showModal: boolean;
  selectedComputador: Pc;
}) => {

  const computadoresOrdenados = computadores.sort((a, b) => parseInt(a.id_pc || '0') - parseInt(b.id_pc || '0'));

  const columnas = [];
  for (let i = 0; i < computadoresOrdenados.length; i += 5) {
    columnas.push(computadoresOrdenados.slice(i, i + 5));
  }
  let fila = 0;


  const onChangeDocumento = (e: any) => {
    handleDocumentoChange(e.target.value);
  };


  //console.log('turnos',turnos);
  return (
    <nav className="d-flex flex-wrap justify-content-around ">
      <Row>
        {columnas.map((columna, indexColumna) => (
          <div className="col-2" key={indexColumna}>
            {columna.map((computador, indexFila) => {
              fila++;
              return (
                <div className="mb-3"
                  key={indexFila + 1}
                >
                  <div onClick={() => handleShowModal(computador as Pc)}>
                    <ComputadorCard
                      key={indexFila}
                      computador={computador}
                      handleShowModal={handleShowModal}
                    />
                  </div>
                </div>
              );
            })}
            {fila >= 25 && (
              <div className="w-100 my-3" style={{ height: '50px' }}></div>
            )}
          </div>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar PC </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComputador && (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="bg-success" style={{ height: '5px' }}>
                    <th>PC No.</th>
                    <th>IP</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="w-100 my-1" style={{ height: '5px' }}>
                    <td>{selectedComputador.numero}</td><td>{selectedComputador.ip}</td><td>{selectedComputador.estado}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
            <EstudianteTable estudiantes={estudiantes} />
          ) : (<EmptyTable mensaje="El Usuario no esta registrado" />)}
          <p></p>

          <p></p>
          <PrestamoForm
            handleSubmit={handleSubmit}
            onChangeDocumento={onChangeDocumento}
            documentoAnterior={documentoAnterior}
            selectedComputador={selectedComputador}
            estudiantes={estudiantes}
          />
          {Array.isArray(turnos) && turnos?.length > 0 ? (
            <TurnoTable turnos={turnos} />

          ) : (<>
            <EmptyTable mensaje="No existen Turnos asignados" />
          </>)}
        </Modal.Body>
      </Modal>

    </nav>
  );
};
export default SidebarPcs;