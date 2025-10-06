

import {Modal} from "react-bootstrap";
import { Pc } from "./type";
import { ApiTurnoResponseData } from "@/common/type/type._turnos";
import FormTabs from "./FormTabs";
import { useViewport } from "@/hooks";
import SliderDesktop from "./SliderDesktop";
import SliderMobile from "./SliderMobile";
import { ProgramaList } from "@/common/type/type._programas";

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
  const onChangeDocumento = (e: any) => {
    handleDocumentoChange(e.target.value);
  };
  const { width } = useViewport();
  return (
    <nav className="flex-column flex-sm-row">
      { width > 1140 ? <SliderDesktop columnas={columnas} handleShowModal={handleShowModal} />:<SliderMobile columnas={columnas} handleShowModal={handleShowModal} />}
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