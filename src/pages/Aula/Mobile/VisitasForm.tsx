// PrestamoForm.tsx
import { ProgramaList } from '@/common/type/type_loginemail';
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface PrestamoFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (event: any) => void;
  documentoAnterior: string;
  estudiantes: any;
  programas: ProgramaList;
}
const VisitasForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  programas,
}: PrestamoFormProps) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (estudiantes?.length < 1) {
      event.preventDefault();
      Swal.fire({
        title: 'Error',
        text: 'Lo sentimos, tus datos no están registrados en nuestra base de datos. Puedes registrarte en la pestaña de Registro Rápido para acceder a nuestros servicios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
      <nav className="flex-column flex-sm-row">
        <Form noValidate onSubmit={handleSubmit} className="position-relative mb-5" >
          <Row>
            
            <Col sm={6} className="mt-5">
              <Form.Group className="mobile-form-group bg-light"  controlId="validation" >
                <Form.Label className="bg-light"><small className="ms-0 ">1. Digite su No. Identificacion:</small></Form.Label>
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
                <Form.Label>2. Motivo de la Visita</Form.Label>
                <Form.Select required name="tipo_visita" onChange={handleSelectChange}   className="bg-white">
                  <>
                    <option value="6">Consulta de tesis</option>
                    <option value="7">Estudio</option>
                    <option value="8">Leer</option>
                    <option value="9">Investigación</option>
                    <option value="10">Estudio</option>
                    <option value="11">Capacitación</option>
                    <option value="12">Otros</option>
                  </>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, seleccione el tiempo préstamo</Form.Control.Feedback>
              </Form.Group>
            </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mobile-form-group bg-light" controlId="validationPrograma">
              <Form.Label >3. Programas</Form.Label>
              <Form.Select
                required
                name="programa"
                 className="bg-white"
              >
                <option value="">Seleccione un programa</option>
                {programas?.map((prog) => (
                  <option key={prog.id} value={prog.programa}   className="bg-white">
                    {prog.programa}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid"  className="bg-white">
                Por favor, seleccione un programa
              </Form.Control.Feedback>
            </Form.Group>
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
  );
};

export default VisitasForm;