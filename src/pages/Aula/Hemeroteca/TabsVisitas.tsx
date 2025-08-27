import React from 'react';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';

import { ProgramaList } from '@/common/type/type._programas';
import classnames from 'classnames';
import EstudianteTable from '../Aulavirtual/EstudianteTable';
import EmptyTable from '../Aulavirtual/EmptyTable';
import PrestamoForm from '../Aulavirtual/PrestamoForm';
import TurnoTable from '../Aulavirtual/TurnoTable';
import EstudianteForm from '../Aulavirtual/EstudianteForm';
import { ApiVisitaResponseData } from '@/common/type/type._visitas';
import VisitasTable from './VisitasTable';
import VisitasForm from './VisitasForm';

interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: any[];
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
      title: 'Prestamo',
      icon: 'mdi mdi-home-variant',
      text: '',
    },
    {
      id: '2',
      title: 'Registro Rapido',
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
          {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
            <EstudianteTable estudiantes={estudiantes} />
          ) : (
            <EmptyTable mensaje="El Usuario no esta registrado" />
          )}
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