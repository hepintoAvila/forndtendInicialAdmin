import { config, encodeBasicUrl} from '@/common';
 
import PcsService from '@/common/api/pcs';
import { AuthContext } from '@/common/context/AuthContext';
import { Credentials, PcsData } from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';

export default function usePcs(){

const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [computadores, setComputadores] = useState<PcsData[]>([]);
  

  // Verificar autenticación al inicializar
 

  const getComputadores = async (credentialsUrl: any) => {
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
      
      const pcService = PcsService(urlObjet);
      const result = await pcService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setComputadores(result.data.pcs);
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
 const addComputadores = async (credentialsUrl: any) => {
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
      
      const pcService = PcsService(urlObjet);
      const result = await pcService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setComputadores(result.data.pcs);
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
 
 
  return {
    loading,
    error,
    isAuthenticated,
    computadores,
    getComputadores,
    addComputadores
  };
};