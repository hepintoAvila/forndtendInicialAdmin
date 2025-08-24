import { config, encodeBasicUrl} from '@/common';
 
import PcsService from '@/common/api/pcs';
import { AuthContext } from '@/common/context/AuthContext';
import { Credentials, PcsData } from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';

import { atom, useAtom } from 'jotai';
const ApiEPcAtom = atom<PcsData>([] as unknown as PcsData);

export default function usePcs(){
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

const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [computadores, setComputadores] = useAtom(ApiEPcAtom);

  const sendComputadores = async (credentialsUrl: any,BodyData:any) => {
    setLoading(true);
    setError(null);
       const urlObjet = {
        accion: credentialsUrl.accion,
        opcion: credentialsUrl.opcion,
        _SPIP_PAGE: config.API_ADMIN_PCS,
        var_ajax: 'form',
        bonjour: 'oui', 
        action: 'true'
      }; 

  try {
      
      const pcService = PcsService(urlObjet,BodyData);
      const result = await pcService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setComputadores(result.data.pcs as any);
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
    const sendComputadorRequest = async () => {
        const credentialsUrlPc = {
          accion: encodeBasicUrl(config.API_ACCION_PCS),
          opcion: encodeBasicUrl(config.API_OPCION_PCS),
        };
        const ObjetBodys = {
          id_pc: 0,
          estado: 'Active',
        };
        const BodyData = generateBodyData(ObjetBodys);
        await sendComputadores(credentialsUrlPc, BodyData)
        .then((response) => {
          setComputadores(response.pcs as any);
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
    computadores,
    sendComputadores,
    sendComputadorRequest
  };
};