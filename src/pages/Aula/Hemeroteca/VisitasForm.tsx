// PrestamoForm.tsx
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
 interface PrestamoFormProps {
   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
   onChangeDocumento: (event: any) => void;
   documentoAnterior: string;
    estudiantes: any;
 }

const VisitasForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
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
    
      <Form noValidate onSubmit={handleSubmit} className="position-relative bg-light mb-5">
        <Row>
           <Col sm={1} className="position-relative me-0"></Col>
          <Col sm={4} className="position-relative me-0">
            <Form.Group controlId="validation">
              <Form.Label>Identificacion:</Form.Label>
              <Form.Control
                required
                type="number"
                name="documento"
                placeholder=""
                defaultValue={documentoAnterior}
                onChange={onChangeDocumento}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el documento
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="position-relative mb-3" controlId="validation">
              <Form.Label>Tipo de Visita</Form.Label>
              <Form.Select required name="tipo_visita" onChange={handleSelectChange}>
                <>
                <option value="6">Consulta de tesis</option>
                <option value="7">Estudio</option>
                <option value="8">Leer</option>
                <option value="2">Investigación</option>
                <option value="3">Estudio</option>
                <option value="4">Capacitación</option>
                <option value="5">Otros</option>
                </>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, seleccione el tiempo préstamo</Form.Control.Feedback>
            </Form.Group>
                        <Form.Group className="mb-3" controlId="validation">
                          <Form.Control
                            required
                            type="hidden"
                            name="programa"
                            placeholder=""
                            defaultValue={estudiantes[0]?.programa}
                          />
                          <Form.Control.Feedback type="invalid">Por favor, digite el pc</Form.Control.Feedback>
                        </Form.Group>
          </Col>
             <Col lg={3} className={'button-visitas'}>
            <Button
             className={'mt-2 mb-4 button-rounded'}
              type="submit"
              disabled={estudiantes?.length < 1}
            >
              <i className="ri-calendar-check-line"></i>
            </Button>
          </Col>
        </Row>
      </Form>
   
  );
};

export default VisitasForm;