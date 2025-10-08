import React from 'react';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';
import classnames from 'classnames';
import { ApiVisitaResponseData } from '@/common/type/type._visitas';
import VisitasTable from './VisitasTable';
import VisitasForm from './VisitasForm';
import EstudianteTable from '../components/EstudianteTable';
import EmptyTable from '../components/EmptyTable';
import EstudianteForm from '../components/EstudianteForm';
import { ProgramaList } from '@/common/type/type._programas';

interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: { documento: string }[] | undefined;
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  programas: ProgramaList[];
  visitas: ApiVisitaResponseData;
}

const TabsVisitas = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  handleSubmitEstudent,
  programas,
  visitas,
}: FormTabsProps) => {
  const tabContents = [
    {
      id: '1',
      title: 'Registra Visitas',
      icon: 'mdi mdi-home-variant',
      text: '',
    },
    {
      id: '2',
      title: 'Registrar Estudiante',
      icon: 'mdi mdi-account-circle',
      text: '',
    },
  ];

  return (
    <Tab.Container defaultActiveKey="Prestamo">
      <Nav variant="tabs">
        {tabContents.map((tab, index) => {
          return (
            <Nav.Item key={index.toString()}>
              <Nav.Link eventKey={tab.title}>
                <i
                  className={classnames(
                    tab.icon,
                    'd-md-none',
                    'd-block',
                    'me-1'
                  )}
                ></i>
                <span className="d-none d-md-block">{tab.title}</span>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="Prestamo">
           <div className="p-3">
          <Row>
            <Col lg={12}>
          <Card>
            <Card.Body>
          <VisitasForm
            handleSubmit={handleSubmit}
            onChangeDocumento={onChangeDocumento}
            documentoAnterior={documentoAnterior}
            estudiantes={estudiantes}
          />
          {
					Array.isArray(estudiantes) && estudiantes.length > 0 ? (
						(estudiantes.length > 0 && estudiantes[0]?.documento === '00000000') ? (
						<EmptyTable mensaje="El Usuario no esta registrado" />
						) : (
						<EstudianteTable estudiantes={estudiantes} />
						)
					) : (
						<EmptyTable mensaje="No hay estudiantes registrados" />
					)
					}
          {Array.isArray(visitas) && visitas?.length > 0 ? (
            <VisitasTable visitas={visitas} />
          ) : (
            <>
              <EmptyTable mensaje="No existen visitas asignados" />
            </>
          )}
          </Card.Body>
          </Card>
          </Col>
          </Row>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="Registro Rapido">
          <EstudianteForm
            onChangeDocumento={onChangeDocumento}
            handleSubmitEstudent={handleSubmitEstudent}
            programas={programas as any}
          />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default TabsVisitas;