import { config, encodeBasicUrl} from '@/common';
import { AuthContext } from '@/common/context/AuthContext';
import { useContext, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { Aula, ApiAulaResponse, Credentials, AulaPrestamoList } from '@/common/type/type_aulas';
import AulaService from '@/common/api/aulas';
import { sendAulaPrestamos } from '@/pages/Aula/Labfisica/types';
import formatoFecha from '@/common/helpers/formatoFecha';
type SendAulasRequestParams = {
  ObjetBodys: any;
  opcionesAulas: {
    accion: string;
    opcion: string;
  };
};
//start: new Date().setDate(new Date().getDate() + 2),
function convertirFechaATimestamp(eventos:any) {
  return eventos?.map((evento: { start: string | number | Date; end: string | number | Date; }) => ({
    ...evento,
    start: new Date(evento.start).getTime(),
    end: new Date(evento.end).getTime(),
  }));
}
const ApiAulasAtom = atom<ApiAulaResponse>([] as unknown as ApiAulaResponse);
const ApiAulasprest = atom<AulaPrestamoList>([] as unknown as AulaPrestamoList);
 
export default function useAulas(){

    const generateBodyDataAula = (ObjetBody: {  id: number, title: string, className: string, textClass: string, } ): Aula => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.id = ObjetBody.id;
            bodyData.title = ObjetBody.title;
            bodyData.className = ObjetBody.className;
            bodyData.textClass = ObjetBody.textClass;
      }
      return bodyData;
    };
    const generateBodyPrestamo = (ObjetBody: {  id: number, title: string, start: Date, end: Date,documento:number } ): AulaPrestamoList => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.id = ObjetBody.id;
            bodyData.title = ObjetBody.title;
            bodyData.start = ObjetBody.start;
            bodyData.end = ObjetBody.end;
            bodyData.documento = ObjetBody.documento;
      }
      return bodyData;
    };
const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aulas, setAulas] = useAtom(ApiAulasAtom);
  const [Prestamos, setAulasPrestamos] = useAtom(ApiAulasprest);

  const sendAulas = async (credentialsUrl: any,BodyData:any) => {

    setLoading(true);
    setError(null);
       const urlObjet = {
        accion: credentialsUrl.accion,
        opcion: credentialsUrl.opcion,
        _SPIP_PAGE: config.API_ADMIN_AULAS,
        var_ajax: 'form',
        bonjour: 'oui', 
        action: 'true'
      }; 

  try {
 
      const aulasService = AulaService(urlObjet,BodyData);
      const result = await aulasService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
          setAulas(result.data.aulas as any);
          setAulasPrestamos(result.data.prestamos as any);
          
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
    const sendAulasRequest = async ({ ObjetBodys, opcionesAulas }: SendAulasRequestParams) => {
      
        const BodyData = generateBodyDataAula(ObjetBodys);
        await sendAulas(opcionesAulas, BodyData)
        .then((response) => {
          console.log("response",response);
          //setAulas(response.aulas as any);
          
        })
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        throw err;
        });
      };
    const addAulasRequest= async (data:any,isEditable:boolean) => {
    //const dataDatos = convertirFechaATimestamp(data);
        const BodyData: sendAulaPrestamos = {
          id: data?.id,
          title: data?.title,
          start: formatoFecha(data?.start),
          end: formatoFecha(data?.end),
          documento: data?.documento,
        }

        const ObjetBodys = generateBodyPrestamo(BodyData as any);
        const opcionesAulas = {
          accion: encodeBasicUrl(config.API_ADMIN_AULAS),
          opcion: isEditable ? encodeBasicUrl(config.API_OPCION_UPDATE_AULAS_PRESTAMO) : encodeBasicUrl(config.API_OPCION_ADD_AULAS_PRESTAMO),
        };
        
       await sendAulas(opcionesAulas, ObjetBodys)
        .then((response) => {
         console.log("response",response);
         // setAulas(response.aulas as any);
          
        })
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        throw err;
        });
    }
 const aulasPrestamos = convertirFechaATimestamp(Prestamos);
   localStorage.setItem('Aulas', JSON.stringify(aulas));
   localStorage.setItem('Prestamos', JSON.stringify(aulasPrestamos));
  return {
    loading,
    error,
    isAuthenticated,
    aulas,
    aulasPrestamos,
    sendAulasRequest,
    sendAulas,
    addAulasRequest,
  };
};