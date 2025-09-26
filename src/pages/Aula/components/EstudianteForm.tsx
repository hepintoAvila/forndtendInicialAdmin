import { ProgramaList } from '@/common/type/type._programas';
import { Button, Form, Row, Col } from 'react-bootstrap';

interface EstudianteFormProps {
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (event: any) => void;
  programas: ProgramaList;
}

const EstudianteForm = ({ onChangeDocumento, programas, handleSubmitEstudent }: EstudianteFormProps) => {
  return (
    <div className="mt-0">
      <Form noValidate onSubmit={handleSubmitEstudent} className="bg-light mb-5 w-100">
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="validationIdentificacion">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                required
                type="number"
                name="identificacion"
                placeholder="Número de documento"
                onChange={onChangeDocumento}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el documento
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="validationPrograma">
              <Form.Label>Programas</Form.Label>
              <Form.Select
                required
                name="programa"
              >
                <option value="">Seleccione un programa</option>
                {programas?.map((prog) => (
                  <option key={prog.id} value={prog.programa}>
                    {prog.programa}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, seleccione un programa
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3}></Col>
          <Col xs={9} className="text-center">
            <Button
              className="button-rounded"
              type="submit"
              variant="primary"
            >
              <i className="ri-add-circle-line ms-3"></i>Registrar Estudiantes
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EstudianteForm;