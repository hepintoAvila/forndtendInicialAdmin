

import {Modal} from "react-bootstrap";
import { Pc } from "./type";
import { ApiTurnoResponseData } from "@/common/type/type._turnos";
import { ProgramaList } from "@/common/type/type._programas";
import FormTabs from "./FormTabs";
 
import SliderDesktop from "./SliderDesktop";
 

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
  consultState,
  programas
}: {
  turnos: ApiTurnoResponseData;
  computadores: Pc[];
  documentoAnterior: any;
  estudiantes: any;
  handleShowModal: (computador: Pc) => void;
  handleDocumentoChange: (arg1: string) => void;
  changeState: (arg1: number,arg2: number,arg3:string) => void;
  consultState: () => void;
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
 // const { width } = useViewport();
  
  const pcLibres = computadores?.filter(pc => pc.estado === 'Libre').sort((a, b) => parseInt(a.id_pc || '0') - parseInt(b.id_pc || '0'));
  return (
    <nav className="flex-column flex-sm-row">
      <SliderDesktop columnas={columnas} handleShowModal={handleShowModal} consultState={consultState}/>
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Asignar PC </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTabs
            selectedComputador={selectedComputador}
            pcLibres={pcLibres as any}
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