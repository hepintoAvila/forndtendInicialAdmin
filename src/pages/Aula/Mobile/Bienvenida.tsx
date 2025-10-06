import { Col } from 'react-bootstrap';

const Bienvenida = () => {
  return (
    <Col sm={12} className="mb-5">
      <div className="text-center mb-2">
        <h2 className="mt-0">
          <i className="mdi mdi-check-all"></i>
        </h2>
        <h3 className="mt-0">¡Bienvenido a nuestra sala de la biblioteca!</h3>

        <p className="w-75 mb-1 mx-auto">
          Esperamos que disfrutes de tu estadía y encuentres todo lo que necesitas para tu estudio y aprendizaje.
        </p>
        <p className="w-75 mb-2 mx-auto">¡Que tengas un excelente día!</p>
      </div>
    </Col>
  );
};

export default Bienvenida;