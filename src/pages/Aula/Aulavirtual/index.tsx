import { config, encodeBasicUrl } from "@/common";
import { usePcs } from "@/hooks";
import { useEffect, useState } from "react";

import { Pc} from "./type";
import useEstudiantes from "@/hooks/useEstudiantes";
import SidebarPcs from "./SidebarPcs";
import { TurnoRequest } from "@/common/type/type._turnos";
import useTurnos from "@/hooks/useTurnos";

 interface Prestamo {
  tiempo_prestamo: string | number;
  fecha_inicial: Date;
}

interface PrestamoResponse {
  fecha_inicial: Date;
  fecha_final: Date;
}

const calcularFechaFinal = (prestamo: Prestamo): PrestamoResponse => {
  const tiempoPrestamo = Number(prestamo.tiempo_prestamo);
  const fechaInicial = new Date(prestamo.fecha_inicial);

  if (isNaN(tiempoPrestamo) || tiempoPrestamo < 1 || tiempoPrestamo > 4) {
    return {
      fecha_inicial: fechaInicial,
      fecha_final: fechaInicial,
    };
  }

  const fechaFinal = new Date(fechaInicial.getTime());
  switch (tiempoPrestamo) {
    case 1:
      fechaFinal.setHours(fechaFinal.getHours() + 1);
      break;
    case 2:
      fechaFinal.setHours(fechaFinal.getHours() + 2);
      break;
    case 3:
      fechaFinal.setHours(fechaFinal.getHours() + 3);
      break;
    case 4:
      fechaFinal.setHours(fechaFinal.getHours() + 4);
      break;
    default:
      return {
        fecha_inicial: fechaInicial,
        fecha_final: fechaInicial,
      };
  }

  return {
    fecha_inicial: fechaInicial,
    fecha_final: fechaFinal,
  };
};
 
const Aulavirtual = () => {

const {getComputadores, computadores} = usePcs();
const { resetEstudiantes,handleDocumentoChange,documentoAnterior,estudiantes}  = useEstudiantes();
const {turnos,setTurno,addTurno} = useTurnos()
  const [showModal, setShowModal] = useState(false);
  const [selectedComputador , setDocumento] = useState<Pc>({} as Pc);
 

  const handleShowModal = (computador: Pc) => {
      setDocumento(computador);
      setShowModal(true);
      handleDocumentoChange('');
  };
  const handleCloseModal = () => {
       setShowModal(false);
       resetEstudiantes();
       handleDocumentoChange(''); 
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
  };
  
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const documento = formData.get('documento');
  const pc = formData.get('pc');
  const tiempo_prestamo = formData.get('tiempo_prestamo'); //1,2,3,4
  const fechaInicial = new Date();

  const prestamo = {
    tiempo_prestamo: tiempo_prestamo,
    fecha_inicial: fechaInicial,
  };

  const resultado = calcularFechaFinal(prestamo as Prestamo);
  const credentialsUrl: TurnoRequest = {
      accion: encodeBasicUrl(config.API_ACCION_TURNOS),
      opcion: encodeBasicUrl(config.API_OPCION_ADD_TURNOS),
      datos: {
        documento,
        pc,
        fecha_final: resultado.fecha_final,
        fecha_inicial: resultado.fecha_inicial,
      }
    };
      addTurno(credentialsUrl);
};

  useEffect(() => {
  const credentialsUrl = {
    accion: encodeBasicUrl(config.API_ACCION_PCS),
    opcion: encodeBasicUrl(config.API_OPCION_PCS),
  };
    getComputadores(credentialsUrl);
  }, []);

 return (
     <>
      {computadores && (
        <SidebarPcs
          turnos={turnos}
          estudiantes={estudiantes}
          computadores={computadores?.map((computador) => ({ ...computador, id_pc: String(computador.id_pc) }))}
          documentoAnterior={documentoAnterior}
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleDocumentoChange={handleDocumentoChange}
          showModal={showModal}
          selectedComputador={selectedComputador}
        />
      )}
    </>
  );
};

export default Aulavirtual;