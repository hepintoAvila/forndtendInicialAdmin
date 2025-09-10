// PrestamoForm.tsx
import { ProgramaList } from '@/common/type/type._programas';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface EstudianteFormProps {
  programas?: ProgramaList;
  sendReportsHistoRequest: (urlObjet: { datos?: { programa: string | any; ubicacion: number | any; fecha: Date | any; }; }) => void;
}

const BuscadorForm = ({ programas,sendReportsHistoRequest}: EstudianteFormProps) => {
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const fecha = formData.get('fecha');
      const ubicacion = formData.get('ubicacion');
      const programa = formData.get('programa');
      const urlObjet: any ={
            datos: {
                programa,
                ubicacion,
                fecha
              }
          }
       console.log('urlObjet',urlObjet);
      sendReportsHistoRequest(urlObjet);
    /*
      if (estudiantes?.length < 1) {
      event.preventDefault();
      Swal.fire({
        title: 'Error',
        text: 'Lo sentimos, tus datos no están registrados en nuestra base de datos. Puedes registrarte en la pestaña de Registro Rápido para acceder a nuestros servicios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
      */
  };


  return (
    <Form noValidate  onSubmit={handleSubmit} className="position-relative bg-light mb-5">
      <Row>
        <Col sm={4}>
           
            <Form.Group className="mb-3" controlId="validationPrograma">
              <Form.Label>Programas</Form.Label>
              <Form.Select required name="programa" /*value={selectedPrograma}*/>
                <option value="">Seleccione un programa</option>
                {programas && programas.map((prog) => (
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
          <Col sm={3} className="position-relative me-0">
            <Form.Group className="position-relative mb-3" controlId="validation">
              <Form.Label>Sala</Form.Label>
              <Form.Select required name="ubicacion" /*onChange={handleSelectChange}*/>
                <>
                <option value="3">Virtualteca</option>
                <option value="2">Hemeroteca</option>
                </>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, seleccione el tiempo préstamo</Form.Control.Feedback>
            </Form.Group>
        </Col>
          <Col sm={3} className="position-relative me-0">
            <Form.Group className="position-relative mb-3" controlId="validation">
              <Form.Label>Fecha</Form.Label>
              <Form.Select required name="fecha" /*onChange={handleSelectChange}*/>
                <>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                </>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, seleccione el tiempo préstamo</Form.Control.Feedback>
            </Form.Group>
        </Col>
        <Col lg={2} className={'button-visitas'}>
            <Button
              className={'mt-2 mb-4 button-rounded'}
              type="submit"
              // disabled={estudiantes?.length < 1}
            >
              <i className="ri-calendar-check-line"></i>
            </Button>
          </Col>
      </Row> 
      </Form>
  );
};

export default BuscadorForm;