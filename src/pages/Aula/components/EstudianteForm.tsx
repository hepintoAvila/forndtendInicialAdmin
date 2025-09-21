import { ProgramaList } from '@/common/type/type._programas';
import { Button, Form } from 'react-bootstrap';

interface EstudianteFormProps {
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (event: any) => void;
  programas: ProgramaList;
}

const EstudianteForm = ({ onChangeDocumento,programas,handleSubmitEstudent }: EstudianteFormProps) => {

 
  return (
    <div className="table-responsive">
      <Form noValidate onSubmit={handleSubmitEstudent} className="position-relative bg-light mb-5">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="bg-success" style={{ height: '5px' }}>
              <th>
                <Form.Group className="mb-3" controlId="validationIdentificacion">
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
              </th>
              <th>
                <Form.Group className="mb-3" controlId="validationPrograma">
                  <Form.Label>Programas</Form.Label>
                  <Form.Select
                    required
                    name="programa"
                   // value={selectedPrograma}
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
              </th>
              <th></th>
            </tr>    
          </thead>
          <tbody>
             <tr className="bg-success" style={{ height: '5px' }}>
           <td><Button
                  className="position-relative mt-4 mb-4 button-rounded mr-2"
                  type="submit"
                  variant="primary"
                ><i className="ri-add-circle-line"></i></Button></td>
           <td></td>
           <td></td>
          </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
};

export default EstudianteForm;