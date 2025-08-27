
import { AuthContext } from '@/common/context/AuthContext';
import { Credentials} from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';
 import { atom, useAtom } from 'jotai';
import { config, encodeBasicUrl, useNotificationContext } from '@/common';
import { ApiVisitaResponseData, VisitaRequest } from '@/common/type/type._visitas';
import VisitaService from '@/common/api/visitas';

const ApiVisitaAtom = atom<ApiVisitaResponseData>([] as unknown as ApiVisitaResponseData);
 
export default function useVisitas(){

 interface BodyDataVista {
      identificacion: string | undefined ;
      tipo_visita: string | undefined ;
      ubicacion: string | undefined ;
      programa: string | undefined ; 
       fecha_creacion: Date;    

}
    const generateBodyData = (ObjetBody: { datos?: {  
        identificacion: string,
        tipo_visita: string,
        ubicacion: string,
        programa: string,
        fecha_creacion: Date;
    } }): BodyDataVista => {

 const bodyData: BodyDataVista = {
      identificacion:'',
      tipo_visita:'',
      ubicacion: "HEMEROTECA",
      programa: '',
      fecha_creacion: new Date(),
    };
  
    if (ObjetBody.datos) {
            bodyData.identificacion = ObjetBody.datos.identificacion;
            bodyData.tipo_visita = ObjetBody.datos.tipo_visita;
            bodyData.ubicacion = ObjetBody.datos.ubicacion;
            bodyData.programa = ObjetBody.datos.programa;
            bodyData.fecha_creacion = ObjetBody.datos.fecha_creacion;
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
  const [visitas, setVisitas] = useAtom(ApiVisitaAtom);
  const [message, setMessage] = useState('');

 const sendVisita = async (urlObjet: VisitaRequest,dataBody:any) => {
    setLoading(true);
    setError(null);
  try {
      
      const turnoService = VisitaService(urlObjet,dataBody);
      const result = await turnoService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setVisitas(result.data.visitas  as unknown as  ApiVisitaResponseData);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const identificacion = formData.get('documento');
      const tipo_visita = formData.get('tipo_visita');
      const programa = formData.get('programa');
      const fecha_creacion = new Date();
      const credentialsUrl: VisitaRequest = {
          accion: encodeBasicUrl(config.API_ACCION_VISITAS),
          opcion: encodeBasicUrl(config.API_OPCION_ADD_VISITAS),
        };
          const urlObjet: any ={
            datos: {
                identificacion,
                tipo_visita,
                programa,
                ubicacion: "HEMEROTECA",
                fecha_creacion:fecha_creacion.toISOString(),
              }
          }
          const bodyData = generateBodyData(urlObjet);
          sendVisita(credentialsUrl, bodyData);
          sendVisitasRequest();

    };
    const sendVisitasRequest = async () => {
        const credentialsUrlPc = {
             accion: encodeBasicUrl(config.API_ACCION_VISITAS),
            opcion: encodeBasicUrl(config.API_OPCION_QUERY_VISITAS),
        };
        const ObjetBodys: any= {
          id_visita: 0,
          status: 'Activo',
        };
        const BodyData = generateBodyData(ObjetBodys);
        await sendVisita(credentialsUrlPc, BodyData)
        .then((response) => {
           setVisitas(response.visitas  as unknown as  ApiVisitaResponseData);
        })
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        throw err;
        });
      };    
 console.log('message',message);
  return {
    loading,
    error,
    isAuthenticated,
    visitas,
    sendVisita,
    handleSubmit,
    sendVisitasRequest,
  };
};