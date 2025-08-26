import TurnosService from '@/common/api/turnos';
import { AuthContext } from '@/common/context/AuthContext';
import { ApiTurnoResponseData, TurnoRequest } from '@/common/type/type._turnos';
import { Credentials} from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';
 import { atom, useAtom } from 'jotai';
import { config, encodeBasicUrl, useNotificationContext } from '@/common';
  interface Prestamo {
  tiempo_prestamo: string | number;
  fecha_inicial: Date;
}

interface PrestamoResponse {
  fecha_inicial: Date;
  fecha_final: Date;
}

const ApiTurnoAtom = atom<ApiTurnoResponseData>([] as unknown as ApiTurnoResponseData);
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
export default function useTurnos(){
 interface BodyData {
        id_pc?: number | undefined ;
        estado?: string | undefined ;

}
    const generateBodyData = (ObjetBody: {  id_pc: number | undefined, estado: string | undefined } ): BodyData => {
      const bodyData: BodyData = {};
      if (ObjetBody) {
            bodyData.id_pc = ObjetBody.id_pc;
            bodyData.estado = ObjetBody.estado;
      }
      return bodyData;
    };


  const { showNotification } = useNotificationContext();
const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [turnos, setTurno] = useAtom(ApiTurnoAtom);
  const [message, setMessage] = useState('');

 const sendTurno = async (urlObjet: TurnoRequest,dataBody:any) => {
    setLoading(true);
    setError(null);
  try {
      
      const turnoService = TurnosService(urlObjet,dataBody);
      const result = await turnoService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setTurno(result.data.turno  as unknown as  ApiTurnoResponseData);
         const message = result.message  as unknown as string;
          
         setMessage(message);
          showNotification({ message: '', type: 'loading' });
        return result.data;
      } else {
        throw new Error(result.error || 'Autenticación fallida');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  interface BodyDataTurno {
      documento: number;
      pc: number;
      fecha_inicial: Date;
      fecha_final: Date;
      ubicacion: number;
      tipo_prestamo: string;
  }
  const generateBodyDataAsigTurno = (urlObjet: { datos?: { documento: number | any, pc: number | any , fecha_final: Date | any , fecha_inicial: Date | any, tipo_prestamo: string | any } }): BodyDataTurno => {
    
  
    const bodyData: BodyDataTurno = {
      documento: 0,
      pc: 0,
      fecha_inicial: new Date(),
      fecha_final: new Date(),
      ubicacion: 2,
      tipo_prestamo: '',
    };
  
    if (urlObjet.datos) {
      bodyData.documento = urlObjet.datos.documento;
      bodyData.pc = urlObjet.datos.pc;
      bodyData.tipo_prestamo = urlObjet.datos.tipo_prestamo;
      bodyData.fecha_inicial = urlObjet.datos.fecha_inicial;
      bodyData.fecha_final = urlObjet.datos.fecha_final;
    }
    return bodyData;
  };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const documento = formData.get('documento');
      const pc = formData.get('pc');
      const tipo_prestamo = formData.get('tipo_prestamo'); //1,2,3,4
     
      const fechaInicial = new Date();

      const prestamo = {
        tiempo_prestamo: 1,
        fecha_inicial: fechaInicial,
      };

      const resultado = calcularFechaFinal(prestamo as Prestamo);
      
      const credentialsUrl: TurnoRequest = {
          accion: encodeBasicUrl(config.API_ACCION_TURNOS),
          opcion: encodeBasicUrl(config.API_OPCION_ADD_TURNOS),
        };
          const urlObjet: any ={
            datos: {
                documento,
                pc,
                tipo_prestamo,
                fecha_final: resultado.fecha_final.toISOString(),
                fecha_inicial: resultado.fecha_inicial.toISOString(),
              }
          }
           console.log('urlObjet',urlObjet);
          const bodyData = generateBodyDataAsigTurno(urlObjet);
          sendTurno(credentialsUrl, bodyData);
    };
 console.log('message',message);
  return {
    loading,
    error,
    isAuthenticated,
    turnos,
    sendTurno,
    setTurno,
    handleSubmit,
    generateBodyData
  };
};