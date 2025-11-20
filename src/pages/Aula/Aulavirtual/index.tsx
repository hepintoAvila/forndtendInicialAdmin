import { config, encodeBasicUrl } from "@/common";
import { usePcs } from "@/hooks";
import { useEffect, useState } from "react";

import { Pc} from "./type";
import useEstudiantes from "@/hooks/useEstudiantes";
import SidebarPcs from "./SidebarPcs";
import useTurnos from "@/hooks/useTurnos";
import useProgramas from "@/hooks/useProgramas";
//import io from 'socket.io-client';
//import Swal from "sweetalert2";
//import { TurnoRequest } from "@/common/type/type._turnos";
 
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
       sendComputadorRequest(); 

  };
  
const consultState = () => {
   const credentialsUrl = {
        accion: encodeBasicUrl(config.API_ACCION_PCS),
        opcion: encodeBasicUrl(config.API_OPCION_PCS),
  };
    const ObjetBodys = {
      id_pc:0,
      pcselect:0,
      estado:'Libre',
    }
    const BodyData = generateBodyData(ObjetBodys);
    sendComputadores(credentialsUrl,BodyData);
}

const changeState = (id_pc: number,pcselect:number,estado:string) => {
   const credentialsUrl = {
    accion: encodeBasicUrl(config.API_ACCION_PCS),
    opcion: encodeBasicUrl(config.API_OPCION_UPDATE_PCS),
  };
  const nuevoEstado = estado === 'Pendiente' ? 'Ocupado' : estado === 'Ocupado' ? 'Libre' : 'Ocupado';
  const ObjetBodys = {
    id_pc: id_pc,
    pcselect: pcselect > 0 ? pcselect : id_pc,
    estado: nuevoEstado,
  }
    const BodyData = generateBodyData(ObjetBodys);
   //console.log('BodyData',BodyData)
    sendComputadores(credentialsUrl,BodyData);
}
 
  useEffect(() => {
      const credentialsUrl = {
        accion: encodeBasicUrl(config.API_ACCION_PCS),
        opcion: encodeBasicUrl(config.API_OPCION_PCS),
      };

    const ObjetBodys = {
          id_pc:0,
          pcselect:0,
          estado:'Active',
        }
        const BodyData = generateBodyData(ObjetBodys);
        sendComputadores(credentialsUrl,BodyData);
  }, []);
 
  useEffect(() => {
        sendProgramasRequest();
  }, []);
/*
  const generateBodyDataAsigTurno = (urlObjet: { datos?: { pc: number | any, email: string | any , ubicacion: string | any , motivo: string | any} }): any => {
  const bodyData: any = {
      pc:0,
      email: '',
      ubicacion:'',
      motivo:'',
    };
  
    if (urlObjet.datos) {
      bodyData.pc = urlObjet.datos.pc;
      bodyData.email = urlObjet.datos.email;
      bodyData.ubicacion = urlObjet.datos.ubicacion;
      bodyData.motivo = urlObjet.datos.motivo;
    }
    return bodyData;
  };
useEffect(() => {
  
      const socket = io('https://biblioteca.unicesar.edu.co:3001', {
        path: '/assets/socket.io'
      });
   
   const socket = io('http://localhost:3000');
  // Escuchar evento de selección de PC
  socket.on('pc-seleccionado', (pc) => {
    // Mostrar ventana emergente con la información del PC seleccionado
       Swal.fire({
            title: `¿Desea asignar el turno del PC No. ${pc.nombre}?`,
            text: `Has clic en "Sí, asignar turno" para confirmar.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, asignar turno',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                
               
                //if (validateForm(pc.nombre, pc.ubicacion, pc.motivo, pc.email)) {
                        const credentialsUrl: TurnoRequest = {
                            accion: encodeBasicUrl(config.API_ACCION_TURNOS),
                            opcion: encodeBasicUrl(config.API_OPCION_ADD_TURNOS_MOBILE),
                          };
                            const urlObjet: any ={
                              datos: {
                                  pc: pc.pc,
                                  email: pc.email,
                                  ubicacion:pc.ubicacion,
                                  motivo:pc.motivo
                                }
                            }
                            const bodyData = generateBodyDataAsigTurno(urlObjet);
                            console.log('PC seleccionado para préstamo:', bodyData);
                            sendTurno(credentialsUrl, bodyData);
                            Swal.fire({
                            title: 'PC asignado',
                            text: `No. ${pc.nombre}`,
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            timer: 2000,
                        });
                   
                //}
                
            } else {
                Swal.fire({
                    title: 'Asignación cancelada',
                    text: 'No se asignó el PC',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    timer: 2000,
                });
            }
        });
    //alert(`Se seleccionó el PC ${pc.nombre} para préstamo`);
  });

  // Limpiar el socket cuando el componente se desmonta
  return () => {
    socket.disconnect();
  };
}, []);
*/

 useEffect(() => {
    const pendientes = Array.isArray(computadores) ? computadores.filter(item => item.estado === 'Pendiente').length : 0;
    localStorage.setItem('pendientes', String(pendientes));
}, [computadores]);

 return (
     <>
      {computadores && (
        <SidebarPcs
          changeState={changeState}
          consultState={consultState}
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