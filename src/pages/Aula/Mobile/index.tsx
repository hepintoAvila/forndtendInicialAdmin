
import { Container } from 'react-bootstrap';
import TabsVisitas from './TabsVisitas';
import { useEffect } from 'react';


import usePcs from '@/hooks/usePcs';
import { config, encodeBasicUrl } from '@/common/helpers';

const PagInicio = () => {
    //const { documentoAnterior, estudiantes, handleSubmitEstudent, getDatosEstudiantesVisitas } = useEstudiantes();
   
    //const { handleSubmitEmail } = useLoginEmail();
    const { sendComputadoresMobile, computadores } = usePcs();
    //const { sendVisitasRequest, visitas } = useVisitas();

   // const auth: User = user as unknown as User;
    useEffect(() => {
        //if () {
            
            const credentialsUrl = {
                accion: encodeBasicUrl(config.API_ACCION_PCS),
                opcion: encodeBasicUrl(config.API_OPCION_PCS),
            };
            const BodyData = {
                id_pc: 0,
                estado: 'Active',
            };
            sendComputadoresMobile(credentialsUrl, BodyData);
        //}
    }, []);



  
    return (<>
        <Container fluid className="pl-0" style={{ marginLeft: '0rem', width: '80%', marginTop: '0rem' }}>

  
            <TabsVisitas
                //handleSubmit={handleSubmit}
                //onChangeDocumento={onChangeDocumento}
                //handleSelectChangeRol={handleSelectChangeRol}
                //setDocumento={setDocumento}
                //documentoAnterior={documento}
                computadores={computadores as any}
               //programas={programas as any}
            />
        </Container>
    </>);
};

export default PagInicio;
