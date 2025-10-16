import { Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { Wizard, Steps, Step } from 'react-albus';
import UbicacionForm from './UbicacionForm';
import MotivoForm from './MotivoForm';
import Bienvenida from './Bienvenida';
import ComputadoresCard from './Components/ComputadoresCard';
import useFormState from './hook/useFormState';

const WizardWithProgressbar = ({ computadores,usuario }: any) => {
    const {
        ubicacion,
        setUbicacion,
        bienvenido,
        motivo,
        setMotivo,
        pc,
        handleSelectComputador,
        handleFormChange,
        handleSubmitForm,
    } = useFormState(usuario);

console.log('computadores', computadores);
    return (<>
        <Card>
            <Card.Body>
                <Wizard
                    render={({ step, steps }) => (
                        <>
                            <ProgressBar
                                animated
                                striped
                                variant="success"
                                now={((steps.indexOf(step) + 1) / steps.length) * 100}
                                className="mb-3 progress-sm"
                            />

                            <Steps>
                                <Step
                                    id="ubicacion"
                                    render={({ next }) => (
                                        
                                            <><UbicacionForm
                                            ubicacion={ubicacion}
                                            setUbicacion={setUbicacion as any}
                                            handleSubmit={(data) => {
                                                handleFormChange('ubicacion', data.ubicacion);
                                                next();
                                            } } /><Form>
                                                <ul className="list-inline wizard mb-0">
                                                    <li className="next list-inline-item float-end">
                                                        <Button className="submit-button rounded-pill" onClick={next} disabled={!ubicacion}>
                                                            Siguiente
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </Form></>
                                    )}
                                />
                                <Step
                                    id="motivo"
                                    render={({ next }) => (
                                        <Form>
                                            {bienvenido ? (
                                                <Bienvenida />
                                            ) : (
                                                <MotivoForm
                                                    handleSubmit={(data) => {
                                                        handleFormChange('motivo', data.motivo);
                                                        next();
                                                        if (ubicacion === 'Hemeroteca') {
                                                            handleSubmitForm();
                                                        }
                                                    }}
                                                    motivo={motivo}
                                                    ubicacion={ubicacion}
                                                    setMotivo={setMotivo}
                                                />
                                            )}
                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-end">
                                                    <Button
                                                        className="submit-button rounded-pill"
                                                        onClick={() => {
                                                            next();
                                                            if (ubicacion === 'Hemeroteca') {
                                                            handleSubmitForm();
                                                        }
                                                        }}
                                                        disabled={!motivo}>
                                                        {ubicacion === 'Hemeroteca' ? 'Enviar Solicitud' : 'Siguiente'}
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Form>
                                    )}
                                />
                                <Step
                                    id="dumbledore"
                                    render={() => (
                                        <Row>
                                            {ubicacion === 'Hemeroteca' ? (
                                                <Bienvenida />
                                            ) : ubicacion === 'Aula Virtual-Virtualteca' && pc === 0 ? (
                                                computadores?.length > 0 ? (
                                                    <ComputadoresCard
                                                        computadores={computadores as any}
                                                        handleSelectComputador={handleSelectComputador}
                                                    />
                                                ) : (
                                                    <div>Cargado...</div>
                                                )
                                            ) : (
                                                bienvenido && <Bienvenida />
                                            )}
                                        </Row>
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
type Usuario = {
  Nom?: string;
  Email?: string;
  Rol?: string;
  status?: string | undefined;
  AppKey: string;
};

type Usuarios = Usuario[];
interface FormTabsProps {
  usuario: Usuarios; // Cambia Usuarios a Usuario
  computadores: [] | undefined;
}

const WizardForm = ({ computadores,usuario }: FormTabsProps) => {
    return (
        <>
            <Row>
                <Col xl={12}>
                    <WizardWithProgressbar computadores={computadores} usuario={usuario} />
                </Col>
            </Row>
        </>
    );
};

export { WizardForm };
