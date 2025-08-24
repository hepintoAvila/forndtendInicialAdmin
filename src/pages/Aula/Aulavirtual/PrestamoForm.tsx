// PrestamoForm.tsx
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

interface PrestamoFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (event: any) => void;
  documentoAnterior: string;
  selectedComputador: any;
  estudiantes: any[];
}

const PrestamoForm = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  selectedComputador,
  estudiantes,
}: PrestamoFormProps) => {
  return (
    <div className="d-flex flex-wrap justify-content-around ">
      <Form noValidate onSubmit={handleSubmit} className="position-relative bg-light mb-5">
        <Row>
          <Col sm={6}>
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
            <Form.Group className="mb-3" controlId="validation">
              <Form.Control
                required
                type="hidden"
                name="pc"
                placeholder=""
                defaultValue={selectedComputador.numero}
              />
              <Form.Control.Feedback type="invalid">Por favor, digite el pc</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="position-relative mb-3" controlId="validation">
              <Form.Label>Tiempo del préstamo</Form.Label>
              <Form.Select required name="tiempo_prestamo">
                <option value="1">Una Hora</option>
                <option value="2">Dos Horas</option>
                <option value="3">Tres horas</option>
                <option value="4">Cuatro Horas</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, seleccione el tiempo préstamo</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={8}></Col>
          <Col lg={4}>
            <Button
              className={'position-relative mt-0 ms-2 mb-4'}
              type="submit"
              disabled={estudiantes?.length < 1}
            >
              Prestar equipo
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PrestamoForm;