import { Card, Col, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import EmptyTable from '../components/EmptyTable';
import EstudianteTable from '../components/EstudianteTable'; 
import { ProgramaList } from '@/common/type/type._programas';
import VisitasForm from './VisitasForm';
import { useLogout } from '@/hooks';


interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: { documento: string }[] | undefined;
  programas: ProgramaList[];
}

const EstudVisitaForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  programas,
}: FormTabsProps) => {
  const [showModal, setShowModal] = useState(true); 
  const handleCloseModal = () => setShowModal(false);
const logout = useLogout();
const handleLogout = async () => {
    handleCloseModal()
        await logout();
    };
  return (
    <Modal show={showModal} onHide={handleLogout} size="sm" fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Registra tu solicitud en tres pasos:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <VisitasForm
                  handleSubmit={handleSubmit}
                  onChangeDocumento={onChangeDocumento}
                  documentoAnterior={documentoAnterior}
                  estudiantes={estudiantes}
                  programas={programas as any}
                />
                {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
                  estudiantes.length > 0 && estudiantes[0]?.documento === '00000000' ? (
                    <EmptyTable mensaje="El Usuario no esta registrado" />
                  ) : (
                    <EstudianteTable estudiantes={estudiantes} />
                  )
                ) : (
                  <EmptyTable mensaje="No hay estudiantes registrados" />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EstudVisitaForm;