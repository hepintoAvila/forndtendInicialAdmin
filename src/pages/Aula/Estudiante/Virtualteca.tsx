import { useAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import TabsVisitas from './TabsVisitas';
import { useEffect } from 'react';
import useEstudiantes from '@/hooks/useEstudiantes';
import useProgramas from '@/hooks/useProgramas';
import useVisitas from '@/hooks/useVisitas';
//import { useViewport } from '@/hooks';

const Virtualteca = () => {
    const { documentoAnterior, estudiantes, handleSubmitEstudent, getDatosEstudiantesVisitas } = useEstudiantes();
    const { programas, sendProgramasRequest } = useProgramas();
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

    const { isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
    }
 

    return (
        !isLoading && (
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
        )
    );
};

export default Virtualteca;
