import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Wizard, Steps, Step } from 'react-albus';
import TextInput from './Components/TextInput';
import useLoginEmail from '@/hooks/useLoginEmail';
import {useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import LoginPaso2 from './LoginPaso2';
import Swal from 'sweetalert2';
import { config, encodeBasicUrl } from '@/common/helpers';
import VisitasForm from './VisitasForm';
import useProgramas from '@/hooks/useProgramas';
import LogoHeader from './Components/LogoHeader';
import { useLogout } from '@/hooks';

 interface BodyDataDocumento {
  documento: number;
}
    interface Data {
        Nom: string;
        Email: string;
        Rol: string;
        status: string;
        AppKey: string;
    }
const WizardWithProgressbar = () => {
    
    const {usuario, handleSubmitSolicitudDocumento,sendDatosPersonales} = useLoginEmail();
    const logout = useLogout();
    const { control, formState: { errors} } = useForm();
    const [documento, setDocumento] = useState(0);
    const [programa, setPrograma] = useState<{ value: string; label?: string }[]>([]);
    const {programas, sendProgramasRequest } = useProgramas();

    const handleLogout = async () => {
        await logout();
   };
    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bodyData: BodyDataDocumento = Number(event.target.value) as unknown as BodyDataDocumento;
        setDocumento(bodyData as unknown as number);
        
     };

    const handleSubmitForm = () => {
        if (!documento) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el documento`,
                icon: 'error',
                timer: 2000,
            });
            return false;
        }

       const doccument ={
            documento: documento
        }    
        handleSubmitSolicitudDocumento(doccument);
        return true;
    };

     const validateVariables= (documento: any, rol: any,email:any,programa:any): any => {
        if (!email) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el email`,
                icon: 'error',
                timer: 2000,
            });
            return false;
        } 
        
        if (!documento) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el documento`,
                icon: 'error',
                timer: 2000,
            });
            return false;
        }

        if (!rol) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el rol`,
                icon: 'error',
                timer: 2000,
            });
            return false;
        }
        if (!programa) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione el programa`,
                icon: 'error',
                timer: 2000,
            });
            return false;
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const documento = formData.get('documento');
        const rol = formData.get('tipo_rol'); // nota que el nombre del campo es "tipo_rol", no "rol"
        const programaValue: string | null = programa && Array.isArray(programa) && programa.length > 0 ? programa[0].value : null;
        const email = formData.get('email');
 
        if (validateVariables(documento, rol,email,programaValue) !== false) {
             
                const credentialsUrl: any = {
                accion: encodeBasicUrl(config.API_ACCION_USUARIOS),
                opcion: encodeBasicUrl(config.API_ADMIN_DATOS_PERSONALES_AUTH0),
                };
                const urlObjet: any = {
                datos: {
                    documento,
                    rol,
                    programa: programaValue,
                    email
                }
                }
                //console.log('urlObjet',urlObjet);
                sendDatosPersonales(credentialsUrl,urlObjet)
                handleLogout();
           
        }
              
    };

    const onChangeDocumento = (e: any) => {
        setDocumento(e.target.value);
    };

 
    const handleSelectPrograma = (prog: any) => {
       
        if (prog) {
            const progArray = Array.isArray(prog) ? prog : [prog];

            setPrograma(progArray);
        }
    };  
       

    useEffect(() => {
        sendProgramasRequest();
    }, []); 
    const statusList = usuario?.data?.auth && Array.isArray(usuario.data.auth) ? usuario.data.auth.map((item:Data) => item.status) : [];
    const isActivo = statusList.some(s => s === 'Activo');
   console.log('usuario',documento);
    return (<>
        <br/>
        <br/>
        
        <Card style={{background: "transparent",height: '36rem'}} >
            <Card.Body>
                <Wizard
                    render={({ step, steps }) => (
                        <>

                            <Steps>
                                <Step
                                    id="ubicacion"
                                    render={({ next }) => (
                                        <Form>
                                            <LogoHeader menssage={'Ingresa tus datos solicitados para registrar tu visita.'}/>
                                            <Row style={{marginBottom: "3rem"}}>
                                                <Col style={{marginTop: "0rem"}}>
                                               
                                                    <TextInput
                                                        name="documento"
                                                       // disabled={isSubmitting}
                                                        label={('Digite su número de documento')}
                                                        type="number"
                                                        value={documento as unknown as string}
                                                        placeholder={('Número de documento')}
                                                        containerClass="form-control-lightmb-3 "
                                                        control={control} // Pasa el control como prop
                                                        errors={errors} // Pasa los errores como prop
                                                        onChange={(event) => {
                                                            handleCheckChange(event);
                                                        }}
                                                    />
                                                   
                                                </Col>
                                            </Row>                                        
                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-end">
                                                    <Button
                                                    
                                                    className="submit-button rounded-pill"
                                                    onClick={() => {
                                                        if (handleSubmitForm()) {
                                                        next();
                                                        }
                                                    }}
                                                    disabled={false}
                                                    >
                                                    Ingresar
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Form>
                                    )}
                                />
                                <Step
                                    id="motivo"
                                    render={({ next, previous }) => (
                                        
                                            <><Row>
                                            <Col>
                                                {isActivo ? <LoginPaso2 /> : <VisitasForm
                                                    handleSubmit={handleSubmit}
                                                    onChangeDocumento={onChangeDocumento}
                                                    handleSelectPrograma={handleSelectPrograma}
                                                    documentoAnterior={documento as any}
                                                    programas={programas as any}
                                                      />}
                                            </Col>
                                        </Row></>
                                        
                                    )}
                                />

                            </Steps>
                        </>
                    )}
                />
            </Card.Body>
        </Card>
    </>);
};


const WizardLogin = () => {
    return (
        <>
            <Row>
                <Col xl={12}>
                    <WizardWithProgressbar />
                </Col>
            </Row>
        </>
    );
};

export { WizardLogin };
