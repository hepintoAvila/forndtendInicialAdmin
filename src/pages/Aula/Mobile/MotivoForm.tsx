import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface MotivoFormProps {
  handleSubmit: (data: { motivo: string }) => void;
  setMotivo: (motivo: string ) => void;
  motivo:string;
}

const MotivoForm = ({ handleSubmit,motivo, setMotivo }: MotivoFormProps) => {
  
  const [motivos, setMotivos] = useState([
    { value: '1', label: 'Consulta de tesis' },
    { value: '2', label: 'Estudio' },
    { value: '3', label: 'Leer' },
    { value: '4', label: 'Investigación' },
    { value: '5', label: 'Capacitación' },
    { value: '6', label: 'Otros' },
  ]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMotivo(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ motivo });
  };

  return (
    <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
      <nav className="flex-column flex-sm-row">
        <Form noValidate onSubmit={onSubmit} className="position-relative mb-5">
          <Row>
            <Col sm={12} className="mt-5">
              <Form.Group className="mobile-form-group bg-light" controlId="validation">
                <Form.Label>Cual es el Motivo de tu Visita</Form.Label>
                <div>
                  {motivos.map((m) => (
                    <Form.Check
                      key={m.value}
                      type="radio"
                      name="motivo"
                      value={m.value}
                      label={m.label}
                      onChange={handleCheckChange}
                      checked={motivo === m.label}
                    />
                  ))}
                </div>
                <Form.Control.Feedback type="invalid">Por favor, seleccione el motivo</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </nav>
    </section>
  );
};

export default MotivoForm;