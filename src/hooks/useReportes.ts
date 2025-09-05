import { config, encodeBasicUrl, useNotificationContext} from '@/common';
import { AuthContext } from '@/common/context/AuthContext';
 
import { useContext, useState } from 'react';

import { atom, useAtom } from 'jotai';
import { ApiResponse } from '@/pages/Reportes/type';
import ReporteService from '@/common/api/reportes';
const ApiEPcAtom = atom<ApiResponse>([] as unknown as ApiResponse);
const ApiVisitas = atom<ApiResponse>([] as unknown as ApiResponse);

export default function useReportes(){
 

    const generateBodyData = (ObjetBody: {  programa: string | undefined} ): any => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.id_pc = ObjetBody.programa;
      }
      return bodyData;
    };
  const { showNotification } = useNotificationContext();
const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [reportes, setReportes] = useAtom<ApiResponse>(ApiEPcAtom);
const [visitas, setVisitas] = useAtom<ApiResponse>(ApiVisitas);
 const [message, setMessage] = useState('');
  const sendReports = async (credentialsUrl: any,BodyData:any) => {
    setLoading(true);
    setError(null);
       const urlObjet = {
        accion: credentialsUrl.accion,
        opcion: credentialsUrl.opcion,
        _SPIP_PAGE: config.API_ADMIN_REPORTES,
        var_ajax: 'form',
        bonjour: 'oui', 
        action: 'true'
      }; 

  try {
      
      const reporteService = ReporteService(urlObjet,BodyData);
      const result = await reporteService.Autentications();

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setReportes(result.data.chartwidget as any);
         setVisitas(result.data.libroVisitas as any);
         const message = result?.message  as unknown as any;
          setMessage(message);
          showNotification({ message: '', type: 'loading' });
        return result.data;
      } else {
        throw new Error(result.error || 'Autenticación fallida');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
       showNotification({ message: '', type: 'loading' });
      throw err;
    } finally {
      setLoading(false);
       showNotification({ message: '', type: 'loading' });
    }
  };
    const sendReportsRequest = async () => {
        const credentialsUrlPc = {
          accion: encodeBasicUrl(config.API_ACCION_REPORTES),
          opcion: encodeBasicUrl(config.API_OPCION_REPORTES),
        };
        const ObjetBodys = {
          programa: 'INGENERIA DE SISTEMAS',
        };
        const BodyData = generateBodyData(ObjetBodys);
        await sendReports(credentialsUrlPc, BodyData)
        .then((response) => {
          setReportes(response.chartwidget as any);
          setVisitas(response.libroVisitas as any);
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
    reportes,
    visitas,
    sendReports,
    sendReportsRequest
  };
};