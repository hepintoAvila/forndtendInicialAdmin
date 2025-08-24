import { config, encodeBasicUrl} from '@/common';
import EstudianteService from '@/common/api/estudiante';
import { AuthContext } from '@/common/context/AuthContext';
import { Credentials, EstudianteServiceResponse } from '@/pages/Aula/Aulavirtual/typeEstudiante';
import { debounce } from 'lodash';
 
import { useContext,useState } from 'react';
import useTurnos from './useTurnos';
import { atom, useAtom } from 'jotai';
const ApiEstudianteAtom = atom<EstudianteServiceResponse>([] as unknown as EstudianteServiceResponse);
export default function useEstudiantes(){
		  interface BodyData {
			  documento?: number | undefined ;
			}
		const generateBodyDataTurno = (bodyDataTurno: { documento: number | undefined}): BodyData => {
		  const bodyData: BodyData = {};
		  if (bodyDataTurno) {
			bodyData.documento = bodyDataTurno.documento;
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
  const [estudiantes, setEsctudiantes] = useAtom(ApiEstudianteAtom);
  const {sendTurno} = useTurnos();
  const resetEstudiantes = () => {
    setEsctudiantes([] as unknown as EstudianteServiceResponse);
  };
  // Verificar autenticación al inicializar
  const [documentoAnterior, setDocumentoAnterior] = useState('');

  //

  const getEstudiantes = async (credentialsUrl: any) => {
    setLoading(true);
    setError(null);
       const urlObjet = {
        documento: credentialsUrl.documento,
        accion: credentialsUrl.accion,
        opcion: credentialsUrl.opcion,
        _SPIP_PAGE: config.API_ADMIN_USUARIOS,
        var_ajax: 'form',
        bonjour: 'oui', 
        action: 'true'
      };  
  try {
      
      const estudianteService = EstudianteService(urlObjet);
  
      const result = await estudianteService.Autentications(credentials as Credentials);

      if (result.status === 'success' && result.data) {
         setIsAuthenticated(true);
         setEsctudiantes(result.data.estudiantes as unknown as EstudianteServiceResponse);
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
 const handleDocumentoChange = debounce(async (value: string) => {
  
    if (value.length >= 6) {

      if (value !== documentoAnterior) {
        
        try {
          const credentialsUrl = {
              accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
              opcion: encodeBasicUrl(config.API_OPCION_USUARIOS),
              documento: value,
            };
            await getEstudiantes(credentialsUrl);
            setDocumentoAnterior(value);
            
            //PRESTAMOS
          const prestamosUrl: any = {
              accion: encodeBasicUrl(config.API_ACCION_TURNOS),
              opcion: encodeBasicUrl(config.API_OPCION_QUERY_TURNOS),
            };
              const $bodyDataTurno: any ={
                documento:value
              }
              const dataBodyturno = generateBodyDataTurno($bodyDataTurno);
              sendTurno(prestamosUrl,dataBodyturno);           
        } catch (error) {
          console.error(error);
        }
      } 
    } 
  }, 500);

  return {
    loading,
    error,
    isAuthenticated,
    estudiantes,
    getEstudiantes,
    resetEstudiantes,
    handleDocumentoChange,
    documentoAnterior
  };
};