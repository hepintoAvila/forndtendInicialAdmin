// PrestamoForm.tsx
import { ProgramaList } from '@/common/type/type._programas';
import TopbarSearch from '@/layouts/Topbar/TopbarSearch';
import { Form, Row, Col, Button } from 'react-bootstrap';
interface PrestamoFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onChangeDocumento: (event: any) => void;
    handleSelectPrograma: (event: any) => void;
    documentoAnterior: string;
    programas: ProgramaList;
}
const VisitasForm = ({
    handleSubmit,
    onChangeDocumento,
    documentoAnterior,
    handleSelectPrograma,
    programas,
}: PrestamoFormProps) => {

  const programasList = programas?.length > 0
    ? programas?.map((prog) => ({
        value: String(prog.id),
        label: prog.programa,
        type: 'programa'
      }))
    : [{ label: 'No hay programas disponibles', value: '', type: 'empty' }]
  
 
    return (
        <>
            <section className="form-container">
                <nav className="flex-column flex-sm-row">
                    <Form validated onSubmit={handleSubmit} className="position-relative">
                        <Row className="form-header">
                            <h3>Formulario de Inscripción para Visitas a Aulas Unicesar</h3>
                        </Row>
                        <Row className="form-body-inscripcio ">
                          <Col xs={12} md={6}>
                             <Form.Label>Seleccione el programa</Form.Label>
                              <TopbarSearch options={programasList} handleSelectPrograma={handleSelectPrograma}/>
                            </Col>
                            <Col sm={4} className="mt-0">
                                <Form.Group className="mobile-form-group bg-light" controlId="validation">
                                    <Form.Label className="bg-light">
                                        <small className="ms-0 ">Digite su no. identificacion:</small>
                                    </Form.Label>
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
                            <Col sm={4} className="mt-0">
                                <Form.Group className="mobile-form-group bg-light" controlId="validation">
                                    <Form.Label className="bg-light">
                                        <small className="ms-0 ">Digite su Email</small>
                                    </Form.Label>
                                    <Form.Control
                                      required
                                      className="bg-white"
                                      type="email"
                                      name="email"
                                      placeholder="@unicesar.edu.co"
                                      defaultValue={''}
                                      onChange={(e) => console.log(e.target.value)} // agrega esto para ver si se actualiza el valor
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, digite el Email
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mobile-form-group" controlId="validation">
                                    <Form.Label>Tu eres?</Form.Label>
                                    <Form.Select
                                        required
                                        name="tipo_rol"
                                        className="bg-white select-programa">
                                        <>
                                            <option value="6">Estudiante</option>
                                            <option value="7">Docente</option>
                                            <option value="8">Egresado</option>
                                            <option value="9">Administrativo</option>
                                        </>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, seleccione el rol
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <Row className="form-footer">
                            <Col lg={12}>
                                <Button type="submit" className="submit-button rounded-pill">
                                    <i className="ri-calendar-check-line me-5"></i>Enviar Solicitud
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </nav>
            </section>
        </>
    );
};

export default VisitasForm;
