import { config, encodeBasicUrl} from '@/common';
 
import PcsService from '@/common/api/pcs';
import { AuthContext } from '@/common/context/AuthContext';
 
import { useContext, useState } from 'react';

import { atom, useAtom } from 'jotai';
import { ChartWidgetData, Credentials, SendData } from '@/pages/Reportes/type';
import ReporteService from '@/common/api/reportes';
const ApiEPcAtom = atom<ChartWidgetData>([] as unknown as ChartWidgetData);

export default function useReportes(){
 

    const generateBodyData = (ObjetBody: {  programa: string | undefined} ): SendData => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.id_pc = ObjetBody.programa;
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
  const [reportes, setReportes] = useAtom(ApiEPcAtom);

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
      const result = await reporteService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setReportes(result.data.chartwidget as any);
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
    const sendReportsRequest = async () => {
        const credentialsUrlPc = {
          accion: encodeBasicUrl(config.API_ACCION_REPORTES),
          opcion: encodeBasicUrl(config.API_OPCION_REPORTES),
        };
        const ObjetBodys = {
          programa: '',
        };
        const BodyData = generateBodyData(ObjetBodys);
        await sendReports(credentialsUrlPc, BodyData)
        .then((response) => {
          setReportes(response.chartwidget as any);
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
    reportes,
    sendReports,
    sendReportsRequest
  };
};