import { config, encodeBasicUrl} from '@/common';
import { AuthContext } from '@/common/context/AuthContext';
import { useContext, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { Aula, AulaData, Credentials } from '@/common/type/type_aulas';
import AulaService from '@/common/api/aulas';

const ApiAulasAtom = atom<AulaData>([] as unknown as AulaData);

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

const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aulas, setAulas] = useAtom(ApiAulasAtom);

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
    const sendAulasRequest = async ({ObjetBodys}: { ObjetBodys: { id: number, title: string, className: string, textClass: string } }) => {
        const credentialsUrlPc = {
          accion: encodeBasicUrl(config.API_ADMIN_AULAS),
          opcion: encodeBasicUrl(config.API_OPCION_AULAS_CONSULTA),
        };
    
        const BodyData = generateBodyDataAula(ObjetBodys);
        await sendAulas(credentialsUrlPc, BodyData)
        .then((response) => {
          setAulas(response.aulas as any);
        })
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        throw err;
        });
      };

  return {
    loading,
    error,
    isAuthenticated,
    aulas,
    sendAulasRequest,
    sendAulas,
  };
};