import { config, encodeBasicUrl } from "@/common";
import { usePcs } from "@/hooks";
import { useEffect, useState } from "react";

import { Pc} from "./type";
import useEstudiantes from "@/hooks/useEstudiantes";
import SidebarPcs from "./SidebarPcs";
import useTurnos from "@/hooks/useTurnos";
import useProgramas from "@/hooks/useProgramas";
import { ProgramaList } from "@/common/type/type._programas";


 

 
const Aulavirtual = () => {

  const {sendComputadores, computadores,sendComputadorRequest} = usePcs();
  const { resetEstudiantes,handleDocumentoChange,documentoAnterior,estudiantes,handleSubmitEstudent}  = useEstudiantes();
  const {generateBodyData,turnos,setTurno,handleSubmit} = useTurnos();
  const {sendProgramasRequest,programas} = useProgramas();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedComputador , setDocumento] = useState<Pc>({} as Pc);
  const handleShowModal = (computador: Pc) => {
      setDocumento(computador);
      setShowModal(true);
      handleDocumentoChange('','');
  };
  const handleCloseModal = () => {
       setShowModal(false);
       resetEstudiantes();
       handleDocumentoChange('',''); 
          setTurno(
        {
        fecha_final:"",
        fecha_inicial:"",
        id_turno:"",
        nombre_estudiante:"",
        numero:"",
        sala:"",
        statut:""
      } as any
      );
       sendComputadorRequest(); 

  };
const changeState = (id_pc: any) => {
   const credentialsUrl = {
    accion: encodeBasicUrl(config.API_ACCION_PCS),
    opcion: encodeBasicUrl(config.API_OPCION_UPDATE_PCS),
  };
    const ObjetBodys = {
      id_pc:id_pc,
      estado:'Libre',
    }
    const BodyData = generateBodyData(ObjetBodys);
    sendComputadores(credentialsUrl,BodyData);
}
  
  useEffect(() => {
      const credentialsUrl = {
        accion: encodeBasicUrl(config.API_ACCION_PCS),
        opcion: encodeBasicUrl(config.API_OPCION_PCS),
      };

    const ObjetBodys = {
          id_pc:0,
          estado:'Active',
        }
        const BodyData = generateBodyData(ObjetBodys);
        sendComputadores(credentialsUrl,BodyData);
  }, []);

  useEffect(() => {
        sendProgramasRequest();
  }, []);
  
//console.log('computadores',computadores);
 return (
     <>
      {computadores && (
        <SidebarPcs
          changeState={changeState}
          programas={programas as any}
          turnos={turnos}
          estudiantes={estudiantes}
          computadores={computadores?.map((computador:any) => ({ ...computador, id_pc: String(computador.id_pc) }))}
          documentoAnterior={documentoAnterior}
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleSubmitEstudent={handleSubmitEstudent}
          handleDocumentoChange={handleDocumentoChange as any}
          showModal={showModal}
          selectedComputador={selectedComputador}
        />
      )}
    </>
  );
};

export default Aulavirtual;