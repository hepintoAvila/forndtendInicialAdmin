import { config, encodeBasicUrl, useNotificationContext} from '@/common';
import { AuthContext } from '@/common/context/AuthContext';
 
import { useContext, useState } from 'react';

import { atom, useAtom } from 'jotai';
import { ApiHistoResponse, ApiResponse } from '@/pages/Reportes/type';
import ReporteService from '@/common/api/reportes';
import ReporteHistoService from '@/common/api/reportesHistoricos';
const ApiEPcAtom = atom<ApiResponse>([] as unknown as ApiResponse);
const ApiVisitas = atom<ApiResponse>([] as unknown as ApiResponse);
const ApiHisto = atom<ApiHistoResponse>([] as unknown as ApiHistoResponse);

export default function useReportes(){
 

    const generateBodyData = (ObjetBody: {  programa: string | undefined} ): any => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.id_pc = ObjetBody.programa;
      }
      return bodyData;
    };

    const generateBodyDataHistorico = (ObjetBody: {  programa: string | undefined ,ubicacion: string | undefined,fecha: string | undefined} ): any => {
      const bodyData: any = {};
      if (ObjetBody) {
            bodyData.programa = ObjetBody.programa;
            bodyData.ubicacion = ObjetBody.ubicacion;
            bodyData.fecha = ObjetBody.fecha;
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
 const [historicos, setHistoriReportes] = useAtom<ApiHistoResponse>(ApiHisto);
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
       //showNotification({ message: '', type: 'loading' });
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

 const sendHistoReports = async (credentialsUrl: any,BodyData:any) => {
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
      
      const reporteService = ReporteHistoService(urlObjet,BodyData);
      const result = await reporteService.Autentications();

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setHistoriReportes(result.data.historicos as any);
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
      // showNotification({ message: '', type: 'loading' });
    }
};

    const sendReportsHistoRequest = async (urlObjet: { datos?: { programa: string | any, ubicacion: number | any , fecha: Date | any  } }) => {
        const credentialsUrlPc = {
          accion: encodeBasicUrl(config.API_ACCION_REPORTES),
          opcion: encodeBasicUrl(config.API_OPCION_REPORTES_CONSULTA_HISTORICOS),
        };
        const ObjetBodys = {
          programa: urlObjet.datos?.programa,
          ubicacion: urlObjet.datos?.ubicacion,
          fecha: urlObjet.datos?.fecha,
        };
        const BodyData = generateBodyDataHistorico(ObjetBodys);
        await sendHistoReports(credentialsUrlPc, BodyData)
        .then((response) => {
         // console.log('response',response);
           setHistoriReportes(response as any);
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
    sendReportsRequest,
    historicos, sendReportsHistoRequest
  };
};