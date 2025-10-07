import { Card, Col, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import VisitasForm from './VisitasForm';
import { useLogout } from '@/hooks';
import { ProgramaList } from '@/common/type/type._programas';
import Profile from './Profile';
import FooterMobile from './Components/FooterMobile';
import { WizardForm } from './WizardForm';
import useLoginEmail from '@/hooks/useLoginEmail';
type Usuario = {
  Nom?: string;
  Email?: string;
  Rol?: string;
  status?: string | undefined;
  AppKey: string;
};

interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  handleSelectChangeRol: (event: any) => void;
  handleSelectPrograma: (event: any) => void;
  documentoAnterior: any;
  programas: ProgramaList[];
  computadores: [] | undefined;
}

const EstudVisitaForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  programas,
  computadores,
  handleSelectChangeRol,
  handleSelectPrograma,
}: FormTabsProps) => {
  const { usuario } = useLoginEmail();

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => setShowModal(false);
  const logout = useLogout();
  const handleLogout = async () => {
    handleCloseModal()
    await logout();
  };


  const statusList: (string | undefined)[] = usuario?.data?.auth?.map((item: Usuario) => item.status) || [];
  const isActivo = statusList.some(s => s === 'Activo');
  //console.log('isActivo', isActivo);
  return (<>
    <Modal show={showModal} onHide={handleLogout} size="sm" fullscreen={true}>
      <Profile />
      <Modal.Header>
        <Modal.Title>{isActivo ? 'Registra tu Visita' : 'Registra tus datos personales'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                {isActivo ? (
                  <WizardForm computadores={computadores as any} usuario={usuario as any} />) : (<VisitasForm
                    handleSubmit={handleSubmit}
                    onChangeDocumento={onChangeDocumento}
                    handleSelectPrograma={handleSelectPrograma}
                    handleSelectChangeRol={handleSelectChangeRol as any}
                    documentoAnterior={documentoAnterior}
                    programas={programas as any}

                  />)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>

      <FooterMobile />
    </Modal>
  </>);
};

export default EstudVisitaForm;