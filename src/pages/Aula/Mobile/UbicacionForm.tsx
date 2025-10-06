import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface PrestamoFormProps {
  handleSubmit: (data: { ubicacion: string }) => void;
  setUbicacion: (ubicacion: string ) => void;
  ubicacion: string;
}

const UbicacionForm = ({ handleSubmit,ubicacion, setUbicacion }: PrestamoFormProps) => {
  
  const [validated, setValidated] = useState(false);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUbicacion(event.target.value);
  };

const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!ubicacion) {
    setValidated(true);
    Swal.fire({
      title: 'Error',
      text: 'Seleccione una ubicación.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return false;
  } else {
    handleSubmit({ ubicacion });
    return true;
  }
};

  return (
    <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
      <nav className="flex-column flex-sm-row">
        <Form noValidate validated={validated} onSubmit={onSubmit} className="position-relative mb-5">
          <Row>
            <Col sm={12} className="mt-5">
              <Form.Group className="mobile-form-group bg-light" controlId="validation">
                <Form.Label>Donde estas ubicado?</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    id="aula-virtual"
                    name="ubicacion"
                    value="Aula Virtual-Virtualteca"
                    label="Aula Virtual-Virtualteca"
                    onChange={handleCheckChange}
                    checked={ubicacion === 'Aula Virtual-Virtualteca'}
                    required
                  />
                  <Form.Check
                    type="radio"
                    id="hemeroteca"
                    name="ubicacion"
                    value="Hemeroteca"
                    label="Hemeroteca"
                    onChange={handleCheckChange}
                    checked={ubicacion === 'Hemeroteca'}
                    required
                  />
                </div>
                <Form.Control.Feedback type="invalid">Por favor, seleccione la ubicación</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </nav>
    </section>
  );
};

export default UbicacionForm;