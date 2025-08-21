import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

interface Rol {
  idRol: number;
  rol?: string;
}

interface EditarRolProps {
  rolSeleccionado: Rol;
  show: boolean;
  onHide: () => void;
  onSave: (rol: Rol) => void;
}

const EditarUsuario: React.FC<EditarRolProps> = ({ rolSeleccionado, show, onHide, onSave }) => {
const [rol, setTipo] = useState(rolSeleccionado?.rol || '');

  useEffect(() => {
    if (rolSeleccionado) {
      setTipo(rolSeleccionado.rol || '');
    }
  }, [rolSeleccionado]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rolSeleccionado) {
      onSave({ ...rolSeleccionado, rol });
    }
  };

 if (!rol) return null;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tipo">
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              value={rol}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTipo(event.target.value)}
            />
          </Form.Group>

          <button type="submit" className="btn btn-primary mt-4">
            Guardar
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditarUsuario;