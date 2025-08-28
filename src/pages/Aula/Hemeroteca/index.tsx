import { useEffect } from "react";
import useEstudiantes from "@/hooks/useEstudiantes";
import useProgramas from "@/hooks/useProgramas";
import useVisitas from "@/hooks/useVisitas";
import TabsVisitas from "./TabsVisitas";
 interface Estudiante {
   id_estudiante: string;
   documento: string;
   nombres: string;
   email: string;
   programa: string;
   celular: string;
 }
 
 type Estudiantes = Estudiante[]

const Hemeroteca = () => {

  const {documentoAnterior,estudiantes,handleSubmitEstudent,getDatosEstudiantesVisitas}  = useEstudiantes();
  const {programas,sendProgramasRequest} = useProgramas();
  const {sendVisitasRequest,visitas,handleSubmit} = useVisitas();


  useEffect(() => {
        sendVisitasRequest();
        sendProgramasRequest();
  }, []);
   const onChangeDocumento = (e: any) => {
 	    getDatosEstudiantesVisitas(e.target.value as any);
  	};

 return (
     <>
    <TabsVisitas
			 handleSubmit={handleSubmit}
			 onChangeDocumento={onChangeDocumento}
			 documentoAnterior={documentoAnterior}
			 estudiantes={estudiantes as unknown as Estudiantes}
			 handleSubmitEstudent={handleSubmitEstudent}
			 programas={programas as any}
			 visitas={visitas} 
			  />
    </>
  );
};

export default Hemeroteca;