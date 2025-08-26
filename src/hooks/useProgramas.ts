import TurnosService from '@/common/api/turnos';
import { AuthContext } from '@/common/context/AuthContext';
import { Credentials} from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';
 import { atom, useAtom } from 'jotai';
import { config, encodeBasicUrl, useNotificationContext } from '@/common';
import { ApiProgramaResponseData, Programa, ProgramaRequest } from '@/common/type/type._programas';
import ProgramaService from '@/common/api/programas';

  interface BodyData {
              id?: number | undefined ;
              programa?: string | undefined ;

      }
const ApiProgramasAtom = atom<ApiProgramaResponseData>([] as unknown as ApiProgramaResponseData);

export default function useProgramas(){
  
    const generateBodyData = (ObjetBody: {  id: number | undefined, programa: string | undefined } ): BodyData => {
      const bodyData: BodyData = {};
      if (ObjetBody) {
            bodyData.id = ObjetBody.id;
            bodyData.programa = ObjetBody.programa;
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
  const [programas, setProgramas] = useAtom(ApiProgramasAtom);
  const [message, setMessage] = useState('');

 const sendProgramas = async (urlObjet: ProgramaRequest,dataBody:BodyData) => {
    setLoading(true);
    setError(null);
  try {
      
      const programaService = ProgramaService(urlObjet,dataBody);
      const result = await programaService.Autentications(credentials as Credentials);
      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setProgramas(result.data.programas  as unknown as  ApiProgramaResponseData);
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

  const generateBodyDataAsigPrograma = (urlObjet: { datos?: { id: number | any, programa: number | any } }): Programa => {
    const bodyData: Programa = {
      id: 0,
      programa: ''
    };
    if (urlObjet.datos) {
      bodyData.id = urlObjet.datos.id;
      bodyData.programa = urlObjet.datos.programa;
    }
    return bodyData;
  };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const programa = formData.get('programa');
      const id = formData.get('id');

      const credentialsUrl: ProgramaRequest = {
          accion: encodeBasicUrl(config.API_ACCION_PROGRAMAS),
          opcion: encodeBasicUrl(config.API_OPCION_ADD_PROGRAMAS),
        };
          const urlObjet: any ={
            datos: {
                id,
                programa,
              }
          }
          //console.log('urlObjet',urlObjet);
          const bodyData = generateBodyDataAsigPrograma(urlObjet);
          sendProgramas(credentialsUrl, bodyData);
    };

    const sendProgramasRequest = async () => {
        const credentialsUrlPc = {
             accion: encodeBasicUrl(config.API_ACCION_PROGRAMAS),
            opcion: encodeBasicUrl(config.API_OPCION_QUERY_PROGRAMAS),
        };
        const ObjetBodys: any= {
          id: 0,
          programa: 'Activo',
        };
        const BodyData = generateBodyData(ObjetBodys);
        await sendProgramas(credentialsUrlPc, BodyData)
        .then((response) => {
           setProgramas(response.programas  as unknown as  ApiProgramaResponseData);
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
    programas,
    sendProgramasRequest,
    handleSubmit
  };
};