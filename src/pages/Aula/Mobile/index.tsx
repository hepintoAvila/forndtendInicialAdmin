import { useAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import TabsVisitas from './TabsVisitas';
import { useEffect } from 'react';
import useEstudiantes from '@/hooks/useEstudiantes';
import useProgramas from '@/hooks/useProgramas';
import useVisitas from '@/hooks/useVisitas';
import useLoginEmail from '@/hooks/useLoginEmail';
//import { useViewport } from '@/hooks';
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
    const {usuario,handleSubmitEmail } = useLoginEmail();

    const { sendVisitasRequest, visitas } = useVisitas();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('event', event);
    };
    useEffect(() => {
        sendVisitasRequest();
        sendProgramasRequest();
    }, []);
    const onChangeDocumento = (e: any) => {
        getDatosEstudiantesVisitas(e.target.value as any);
    };

    const { isLoading,user,loginWithRedirect, logout, isAuthenticated } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
    }
/*
	const {  } = useAuth0();

		const handleLogin = () => {
			if (isAuthenticated) {
				logout({ logoutParams: { returnTo: window.location.origin } });
			} else {
				loginWithRedirect();
			}
		};
*/
const auth: User = user as User;
    useEffect(() => {
         if (!user) {
                console.log('No autenticado');
            }else{
               // console.log('auth', estudiantes);
                handleSubmitEmail(auth.email)
            }
    }, [auth]);
console.log('usuario', usuario);
    return (

        
            <Container fluid className="pl-0" style={{ marginLeft: '0rem', width: '80%', marginTop: '0rem' }}>
              
                    <TabsVisitas
                        handleSubmit={handleSubmit}
                        onChangeDocumento={onChangeDocumento}
                        documentoAnterior={documentoAnterior}
                        estudiantes={estudiantes as any}
                        handleSubmitEstudent={handleSubmitEstudent}
                        programas={programas as any}
                        visitas={visitas}
                    />
             
            </Container>
        
    );
};

export default PagInicio;
