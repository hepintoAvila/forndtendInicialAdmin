import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface MotivoFormProps {
  handleSubmit: (data: { motivo: string }) => void;
  setMotivo: (motivo: string ) => void;
  motivo:string;
  ubicacion:string;
}

const MotivoForm = ({ handleSubmit,motivo, setMotivo,ubicacion }: MotivoFormProps) => {
  
const [motivos] = useState([
  { value: '1', label: 'Consulta bases de datos', sala: 'Aula Virtual-Virtualteca' },
  { value: '2', label: 'Investigación', sala: 'Aula Virtual-Virtualteca' },
  { value: '3', label: 'Estudio', sala: 'Aula Virtual-Virtualteca' },
  { value: '4', label: 'Capacitación', sala: 'Aula Virtual-Virtualteca' },
  { value: '5', label: 'Otros', sala: 'Aula Virtual-Virtualteca' },
  { value: '6', label: 'Consulta de tesis', sala: 'Hemeroteca' },
  { value: '7', label: 'Estudio', sala: 'Hemeroteca' },
  { value: '8', label: 'Leer', sala: 'Hemeroteca' },
  { value: '9', label: 'Investigación', sala: 'Hemeroteca' },
  { value: '10', label: 'Estudio', sala: 'Hemeroteca' },
  { value: '11', label: 'Capacitación', sala: 'Hemeroteca' },
  { value: '12', label: 'Otros', sala: 'Hemeroteca' },
]);
  const filteredMotivos = motivos.filter((m) => m.sala.includes(ubicacion));

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMotivo(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ motivo });
  };

  return (<>
    <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
      <nav className="flex-column flex-sm-row">
        <Form noValidate onSubmit={onSubmit} className="position-relative mb-5">
          <Row>
            <Col sm={12} className="mt-5">
              <Form.Group className="mobile-form-group bg-light" controlId="validation">
                <Form.Label><h3>Cual es el Motivo de tu Visita</h3></Form.Label>
                <div>
                  {filteredMotivos.map((m) => (
                    <div key={m.value} className="d-flex align-items-center" style={{ marginBottom: '10px' }}>
                      <Form.Check
                        type="radio"
                        name="motivo"
                        value={m.label}
                        onChange={handleCheckChange}
                        checked={motivo === m.label}
                        id={m.value}
                        className="form-check-input"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                      />
                      <Form.Label
                        htmlFor={m.value}
                        className="ms-2"
                        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                      >
                        {m.label}
                      </Form.Label>
                    </div>
                  ))}
                </div>
                <Form.Control.Feedback type="invalid">Por favor, seleccione el motivo</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </nav>
    </section>
  </>);
};

export default MotivoForm;