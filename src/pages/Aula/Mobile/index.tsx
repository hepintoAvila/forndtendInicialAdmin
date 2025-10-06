import { useAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import TabsVisitas from './TabsVisitas';
import { useEffect } from 'react';
import useEstudiantes from '@/hooks/useEstudiantes';
import useProgramas from '@/hooks/useProgramas';
import useLoginEmail from '@/hooks/useLoginEmail';
import usePcs from '@/hooks/usePcs';
import { config, encodeBasicUrl } from '@/common/helpers';

interface User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

const PagInicio = () => {
  const { documentoAnterior, estudiantes, handleSubmitEstudent, getDatosEstudiantesVisitas } = useEstudiantes();
  const { programas, sendProgramasRequest } = useProgramas();
  const { usuario, handleSubmitEmail } = useLoginEmail();
  const {sendComputadoresMobile, computadores} = usePcs();
  //const { sendVisitasRequest, visitas } = useVisitas();

  const { isLoading, user, loginWithRedirect, error, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    } else if (isAuthenticated) {
      //sendVisitasRequest();
      sendProgramasRequest();
    }
  }, [isLoading, isAuthenticated]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('event', event);
  };

  const onChangeDocumento = (e: any) => {
    getDatosEstudiantesVisitas(e.target.value as any);
  };

  const auth: User = user as User;

  useEffect(() => {
    if (isAuthenticated) {
      handleSubmitEmail(auth.email);
        const credentialsUrl = {
          accion: encodeBasicUrl(config.API_ACCION_PCS),
          opcion: encodeBasicUrl(config.API_OPCION_PCS),
        };
   
   
      const BodyData = {
            id_pc:0,
            estado:'Active',
          }
   
          sendComputadoresMobile(credentialsUrl,BodyData);
    }
  }, [isAuthenticated]);
 
  if (error) {
    return <div>Error PagInicio: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Container fluid className="pl-0" style={{ marginLeft: '0rem', width: '80%', marginTop: '0rem' }}>

      <TabsVisitas
        handleSubmit={handleSubmit}
        onChangeDocumento={onChangeDocumento}
        documentoAnterior={documentoAnterior}
        estudiantes={estudiantes as any}
        computadores={computadores as any}
        handleSubmitEstudent={handleSubmitEstudent}
        programas={programas as any}
        usuario={usuario as any}
      />
    </Container>
  );
};

export default PagInicio;