// PrestamoForm.tsx
import { ProgramaList } from '@/common/type/type._programas';
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
interface PrestamoFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (event: any) => void;
  handleSelectChangeRol: (event: any) => void;
  handleSelectPrograma: (event: any) => void;
  documentoAnterior: string;
  programas: ProgramaList;
}
const VisitasForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  handleSelectChangeRol,
  handleSelectPrograma,
  programas,
}: PrestamoFormProps) => {

  return (<>
    <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
      <nav className="flex-column flex-sm-row">
        <Form noValidate onSubmit={handleSubmit} className="position-relative mb-5" >
          <Row>
            
            <Col sm={6} className="mt-5">
              <Form.Group className="mobile-form-group bg-light"  controlId="validation" >
                <Form.Label className="bg-light"><small className="ms-0 ">Digite su No. Identificacion:</small></Form.Label>
                <Form.Control
                  required
                  className="bg-white"
                  type="number"
                  name="documento"
                  placeholder="0000000000"
                  defaultValue={documentoAnterior}
                  onChange={onChangeDocumento}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, digite el documento
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={4} >
              <Form.Group className="mobile-form-group bg-light"  controlId="validation">
                <Form.Label>Tu eres?</Form.Label>
                <Form.Select required name="tipo_rol" onChange={handleSelectChangeRol}   className="bg-white select-programa">
                  <>
                    <option value="6">Estudiante</option>
                    <option value="7">Docente</option>
                    <option value="8">Egresado</option>
                    <option value="9">Administrativo</option>
                  </>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, seleccione el rol</Form.Control.Feedback>
              </Form.Group>
            </Col>
          <Col xs={12} md={6}>
           <Form.Label>Seleccione el programa?</Form.Label>
            <Select
              name="programa"
              options={programas?.map((prog) => ({ value: prog.id, label: prog.programa }))}
               onChange={(prog:any) => handleSelectPrograma(prog?.value)}
              placeholder="Buscar programa"
            />
          </Col>
          <Row className={'button-visitas-mobile bg-light'}>
            <Col lg={12} style={{ marginLeft: '0rem' }}>
              <Button
                className={'mt-2 mb-4 button-rounded'}
                type="submit"

              >
                <i className="ri-calendar-check-line me-5"></i>Enviar Solicitud 
              </Button>
            </Col>
          </Row>
          </Row>
        </Form>
      </nav>
    </section>
  </>);
};

export default VisitasForm;