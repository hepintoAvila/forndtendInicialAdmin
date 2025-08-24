import TurnosService from '@/common/api/turnos';
import { AuthContext } from '@/common/context/AuthContext';
import { ApiTurnoResponseData, TurnoRequest } from '@/common/type/type._turnos';
import { Credentials} from '@/pages/Aula/Aulavirtual/type';
import { useContext, useState } from 'react';
 import { atom, useAtom } from 'jotai';
const ApiTurnoAtom = atom<ApiTurnoResponseData>([] as unknown as ApiTurnoResponseData);
export default function useTurnos(){

const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext no está disponible');
  }
  const {credentials} = authContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [turnos, setTurno] = useAtom(ApiTurnoAtom);
  
 const addTurno = async (urlObjet: TurnoRequest) => {
    setLoading(true);
    setError(null);
  try {
      
      const turnoService = TurnosService(urlObjet);
      const result = await turnoService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setTurno(result.data.turno  as unknown as  ApiTurnoResponseData);
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
    turnos,
    addTurno,
    setTurno
  };
};