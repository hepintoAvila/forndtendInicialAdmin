import { Card, Col, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import EmptyTable from '../components/EmptyTable';
import EstudianteTable from '../components/EstudianteTable'; 
import VisitasForm from './VisitasForm';
import { useLogout } from '@/hooks';
import { ProgramaList } from '@/common/type/type._programas';
import Profile from './Profile';
import FooterMobile from './Components/FooterMobile';
import MotivoForm from './MotivoForm';
import { WizardForm } from './WizardForm';
type Usuario = {
  Nom?: string;
  Email?: string;
  Rol?: string;
  status?: string | undefined;
  AppKey: string;
};

type Usuarios = Usuario[];
interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: { documento: string }[] | undefined;
  programas: ProgramaList[];
  usuario: Usuarios; // Cambia Usuarios a Usuario
  computadores: [] | undefined;
}

const EstudVisitaForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  usuario,
  programas,
  estudiantes,
  computadores,
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
     <Profile />
     <br/>
     <br/>
      <Modal.Header>
        <Modal.Title>Registra tu Visita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                 {usuario[0]?.status === 'Activo' ? (
                  <WizardForm computadores={computadores as any}/>):(<VisitasForm
                  handleSubmit={handleSubmit}
                  onChangeDocumento={onChangeDocumento}
                  documentoAnterior={documentoAnterior}
                  estudiantes={estudiantes}
                  programas={programas as any}
                  
                />)}
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
      <FooterMobile />
    </Modal>
  );
};

export default EstudVisitaForm;