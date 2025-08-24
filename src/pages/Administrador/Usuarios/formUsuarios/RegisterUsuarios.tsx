import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
 

interface EditarUsuarioProps {
    usuarioSeleccionado: Usuarios;
    show: boolean;
    onHide: () => void;
    onSave: (usuario: Usuarios) => void;
}

const RegisterUsuarios: React.FC<EditarUsuarioProps> = ({ usuarioSeleccionado, show, onHide, onSave }) => {
    const [nom, setNom] = useState(usuarioSeleccionado?.nom || '');
    const [email, setEmail] = useState(usuarioSeleccionado?.email || '');
    const [pass, setPass] = useState(usuarioSeleccionado?.pass || '');

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNom(usuarioSeleccionado.nom || '');
            setEmail(usuarioSeleccionado.email || '');
            setPass(usuarioSeleccionado.pass || '');
        }
    }, [usuarioSeleccionado]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usuarioSeleccionado) {
            onSave({ ...usuarioSeleccionado, nom, email, pass });
        }
    };

    if (!usuarioSeleccionado) return null;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Rol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nom">
                        <Form.Label>Nombres y Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            key="nom"
                            id="nom"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNom(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Nombres y Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            key="email"
                            id="email"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Pasword</Form.Label>
                        <Form.Control
                            type="text"
                            name="pass"
                            key="pass"
                            id="pass"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
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
export default RegisterUsuarios;
