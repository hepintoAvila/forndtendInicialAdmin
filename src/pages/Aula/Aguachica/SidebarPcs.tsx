import { Card, Modal, Row } from 'react-bootstrap';
import { Pc } from './type';
import { ApiTurnoResponseData } from '@/common/type/type._turnos';
import ComputadorCard from './ComputadorCard';
import { ProgramaList } from '@/common/type/type._programas';
import FormTabs from './FormTabs';

const SidebarPcs = ({
    turnos,
    computadores,
    documentoAnterior,
    estudiantes,
    handleShowModal,
    handleCloseModal,
    handleSubmit,
    handleSubmitEstudent,
    showModal,
    selectedComputador,
    handleDocumentoChange,
    changeState,
    programas,
}: {
    turnos: ApiTurnoResponseData;
    computadores: Pc[];
    documentoAnterior: any;
    estudiantes: any;
    handleShowModal: (computador: Pc) => void;
    handleDocumentoChange: (arg1: string) => void;
    changeState: (arg: number) => void;
    handleCloseModal: () => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
    showModal: boolean;
    selectedComputador: Pc;
    programas: ProgramaList[];
}) => {
    const computadoresOrdenados = computadores?.sort((a, b) => parseInt(a.id_pc || '0') - parseInt(b.id_pc || '0'));

    const onChangeDocumento = (e: any) => {
        handleDocumentoChange(e.target.value);
    };

    const pcs = computadoresOrdenados?.filter((computador) => computador.tipo === 'Pc');
    const videobeams = computadoresOrdenados?.filter((computador) => computador.tipo === 'VideoBeam');
    const columnasPcs = [];
    for (let i = 0; i < pcs.length; i += 3) {
        columnasPcs.push(pcs.slice(i, i + 3));
    }
    let filaPcs = 0;

    const columnasVideobeams = [];
    for (let i = 0; i < videobeams.length; i += 3) {
        columnasVideobeams.push(videobeams.slice(i, i + 3));
    }
    let filaVideobeams = 0;
    return (
        <nav className="d-flex flex-wrap justify-content-around ">
            <Card className="bg-body-tertiary border-0">
                <Card.Body>
                    <Row>
                        <h3 className="font-17 fw-bold mt-5">Computadores</h3>
                        {columnasPcs.map((columna, indexColumna) => (
                            <div className="col-4" key={indexColumna}>
                                {columna.map((computador, indexFila) => {
                                    filaPcs++;
                                    return (
                                        <div className="mb-3" key={indexFila}>
                                            <div onClick={() => handleShowModal(computador as Pc)}>
                                                <ComputadorCard
                                                    key={indexFila}
                                                    computador={computador}
                                                    handleShowModal={handleShowModal}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
            <Card className="bg-body-tertiary border-0">
                <Card.Body>
                    <Row>
                        <h3 className="font-17 fw-bold mt-5">Videobeams</h3>
                        {columnasVideobeams.map((columna, indexColumna) => (
                            <div className="col-4" key={indexColumna}>
                                {columna.map((computador, indexFila) => {
                                    filaVideobeams++;
                                    return (
                                        <div className="mb-3" key={indexFila}>
                                            <div onClick={() => handleShowModal(computador as Pc)}>
                                                <ComputadorCard
                                                    key={indexFila}
                                                    computador={computador}
                                                    handleShowModal={handleShowModal}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar PC </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormTabs
                        selectedComputador={selectedComputador}
                        handleSubmit={handleSubmit}
                        onChangeDocumento={onChangeDocumento}
                        documentoAnterior={documentoAnterior}
                        estudiantes={estudiantes}
                        handleSubmitEstudent={handleSubmitEstudent}
                        programas={programas}
                        turnos={turnos}
                        changeState={changeState}
                    />
                </Modal.Body>
            </Modal>
        </nav>
    );
};
export default SidebarPcs;
