import { useAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import TabsVisitas from './TabsVisitas';
import { useEffect, useState } from 'react';
import useProgramas from '@/hooks/useProgramas';
import useLoginEmail from '@/hooks/useLoginEmail';
import usePcs from '@/hooks/usePcs';
import { config, encodeBasicUrl } from '@/common/helpers';
import Swal from 'sweetalert2';

interface User {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}
interface Usuario {
  documento: string;
  rol: string;
  programa: string;
  email: string;
}

const PagInicio = () => {
    //const { documentoAnterior, estudiantes, handleSubmitEstudent, getDatosEstudiantesVisitas } = useEstudiantes();
    const { programas, sendProgramasRequest } = useProgramas();
    const { usuario, handleSubmitEmail,sendDatosPersonales } = useLoginEmail();
    const { sendComputadoresMobile, computadores } = usePcs();
    //const { sendVisitasRequest, visitas } = useVisitas();

    const { isLoading, user, loginWithRedirect, error, isAuthenticated } = useAuth0();
    const [documento, setDocumento] = useState('');
    const [rol, setRol] = useState('');
    const [programa, setPrograma] = useState('');

    const validateForm = (documento: any, rol: any, programa: any, usuario: any): any => {
        //documento, rol, programa, usuario
        interface Data {
            Nom: string;
            Email: string;
            Rol: string;
            status: string;
            AppKey: string;
        }
        const emails = usuario?.data?.auth && Array.isArray(usuario.data.auth) ? usuario.data.auth.map((item:Data) => item.Email) : [];

        if (!emails || emails.length === 0) {
            Swal.fire({
                title: 'Error',
                text: `No se encontró el correo electrónico del usuario`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }

        if (!documento) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el documento`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }

        if (!rol) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el rol`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }
        if (!programa) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el programa`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }
        return {
            documento,
            rol,
            programa: programa,
            email: emails[0],
        };
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData:Usuario  = validateForm(documento, rol, programa, usuario);
        if (formData) {
        const credentialsUrl: any = {
          accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
          opcion: encodeBasicUrl(config.API_ADMIN_DATOS_PERSONALES_AUTH0),
        };
          const urlObjet: any ={
            datos: {
                documento:formData?.documento,
                rol:formData?.rol,
                programa:formData?.programa,
                email:formData?.email
              }
          }
            sendDatosPersonales(credentialsUrl,urlObjet)
            loginWithRedirect();
        }
    };

    const onChangeDocumento = (e: any) => {
        setDocumento(e.target.value);
    };

    const handleSelectChangeRol = (e: any) => {
        setRol(e.target.value);
    };

    const handleSelectPrograma = (prog: any) => {
        if (prog) {
            setPrograma(prog);
        }
    };
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        } else if (isAuthenticated) {
            //sendVisitasRequest();
            sendProgramasRequest();
        }
    }, [isLoading, isAuthenticated]);

    const auth: User = user as User;

    useEffect(() => {
        if (isAuthenticated) {
            handleSubmitEmail(auth.email);
            const credentialsUrl = {
                accion: encodeBasicUrl(config.API_ACCION_PCS),
                opcion: encodeBasicUrl(config.API_OPCION_PCS),
            };
            const BodyData = {
                id_pc: 0,
                estado: 'Active',
            };
            sendComputadoresMobile(credentialsUrl, BodyData);
        }
    }, [isAuthenticated]);

    if (error) {
        return <div>Error PagInicio: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading ...</div>;
    }

  
    return (<>
        <Container fluid className="pl-0" style={{ marginLeft: '0rem', width: '80%', marginTop: '0rem' }}>
            <TabsVisitas
                handleSubmit={handleSubmit}
                onChangeDocumento={onChangeDocumento}
                handleSelectChangeRol={handleSelectChangeRol}
                handleSelectPrograma={handleSelectPrograma}
                documentoAnterior={documento}
                computadores={computadores as any}
                programas={programas as any}
            />
        </Container>
    </>);
};

export default PagInicio;
