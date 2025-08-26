

import {Modal, Row} from "react-bootstrap";
import { Pc } from "./type";
import { ApiTurnoResponseData } from "@/common/type/type._turnos";
import ComputadorCard from "./ComputadorCard";
import { ProgramaList } from "@/common/type/type._programas";
import FormTabs from "./FormTabs";
import ComputadorTable from "./ComputadorTable";

const SidebarPcs = ({
  turnos,
  computadores,
  documentoAnterior,
  estudiantes,
  handleShowModal,
  handleCloseModal,
  handleSubmit,
  handleSubmitEstudent,
  showModal,
  selectedComputador,
  handleDocumentoChange,
  changeState,
  programas
}: {
  turnos: ApiTurnoResponseData;
  computadores: Pc[];
  documentoAnterior: any;
  estudiantes: any;
  handleShowModal: (computador: Pc) => void;
  handleDocumentoChange: (arg1: string) => void;
  changeState: (arg: number) => void;
  handleCloseModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  showModal: boolean;
  selectedComputador: Pc;
  programas:ProgramaList[];
}) => {

  const computadoresOrdenados = computadores?.sort((a, b) => parseInt(a.id_pc || '0') - parseInt(b.id_pc || '0'));

  const columnas = [];
  for (let i = 0; i < computadoresOrdenados.length; i += 5) {
    columnas.push(computadoresOrdenados.slice(i, i + 5));
  }
  let fila = 0;


  const onChangeDocumento = (e: any) => {
    handleDocumentoChange(e.target.value);
  };

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
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Asignar PC </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTabs
            selectedComputador={selectedComputador}
            handleSubmit={handleSubmit}
            onChangeDocumento={onChangeDocumento}
            documentoAnterior={documentoAnterior}
            estudiantes={estudiantes}
            handleSubmitEstudent={handleSubmitEstudent}
            programas={programas}
            turnos={turnos} 
            changeState={changeState} 
                      />
        </Modal.Body>
      </Modal>

    </nav>
  );
};
export default SidebarPcs;