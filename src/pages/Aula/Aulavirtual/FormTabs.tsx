import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import PrestamoForm from './PrestamoForm';
import EstudianteForm from './EstudianteForm';
import ComputadorTable from './ComputadorTable';
import EstudianteTable from './EstudianteTable';
import EmptyTable from './EmptyTable';
import TurnoTable from './TurnoTable';
import { ApiTurnoResponseData } from '@/common/type/type._turnos';
import { Pc } from './type';
import { ProgramaList } from '@/common/type/type._programas';
import classnames from 'classnames';

interface FormTabsProps {
  selectedComputador: Pc;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: any[];
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  programas: ProgramaList[];
  turnos: ApiTurnoResponseData;
  changeState: (numero: number) => void;
}

const FormTabs = ({
  selectedComputador,
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  handleSubmitEstudent,
  programas,
  turnos,
  changeState,
}: FormTabsProps) => {
  const tabContents = [
    {
      id: '1',
      title: 'Préstamo',
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
          {selectedComputador && (
            <ComputadorTable selectedComputador={selectedComputador} changeState={changeState} />
          )}
          {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
            <EstudianteTable estudiantes={estudiantes} />
          ) : (
            <EmptyTable mensaje="El Usuario no esta registrado" />
          )}
          <p></p>
          <p></p>
          <PrestamoForm
            estado={selectedComputador.estado}
            handleSubmit={handleSubmit}
            onChangeDocumento={onChangeDocumento}
            documentoAnterior={documentoAnterior}
            selectedComputador={selectedComputador}
            estudiantes={estudiantes}
          />
          {Array.isArray(turnos) && turnos?.length > 0 ? (
            <TurnoTable turnos={turnos} />
          ) : (
            <>
              <EmptyTable mensaje="No existen Turnos asignados" />
            </>
          )}
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

export default FormTabs;