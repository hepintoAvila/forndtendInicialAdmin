import { Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { Wizard, Steps, Step } from 'react-albus';
import UbicacionForm from './UbicacionForm';
import MotivoForm from './MotivoForm';
import Bienvenida from './Bienvenida';
import ComputadoresCard from './Components/ComputadoresCard';
import useFormState from './hook/useFormState';

const WizardWithProgressbar = ({ computadores }: any) => {
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
    } = useFormState();

    console.log('bienvenido', bienvenido);
    return (
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
                                        <Form>
                                            <UbicacionForm
                                                ubicacion={ubicacion}
                                                setUbicacion={setUbicacion as any}
                                                handleSubmit={(data) => {
                                                    handleFormChange('ubicacion', data.ubicacion);
                                                    next();
                                                }}
                                            />

                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-end">
                                                    <Button variant="success" onClick={next} disabled={!ubicacion}>
                                                        Siguiente
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Form>
                                    )}
                                />
                                <Step
                                    id="motivo"
                                    render={({ next, previous }) => (
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
                                                    setMotivo={setMotivo}
                                                />
                                            )}
                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-end">
                                                    <Button
                                                        variant="success"
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
                                    render={({ previous }) => (
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
    );
};

const WizardForm = ({ computadores }: any) => {
    return (
        <>
            <Row>
                <Col xl={12}>
                    <WizardWithProgressbar computadores={computadores} />
                </Col>
            </Row>
        </>
    );
};

export { WizardForm };
