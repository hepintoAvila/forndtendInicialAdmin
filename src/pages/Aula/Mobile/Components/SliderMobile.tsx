import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Pc } from './type/type';
import ComputadorCard from '../../Aulavirtual/ComputadorCard';


interface SidebarPcsProps {
  columnas: Pc[][];
  handleShowModal: (computador: Pc) => void;
}

const SliderMobile: React.FC<SidebarPcsProps> = ({ columnas, handleShowModal }) => {
    
  return (<>
    <Row className="gx-2 gy-2">
      {columnas.map((columna, indexColumna) => (
        <Col xs={6} sm={4} md={2} key={indexColumna}>
          {columna.map((computador, indexFila) => (
            <div className="mb-3" key={indexFila + 1}>
              <div onClick={() => handleShowModal(computador)}>
                <ComputadorCard
                  key={indexFila}
                  computador={computador}
                  handleShowModal={handleShowModal}
                />
              </div>
            </div>
          ))}
        </Col>
      ))}
    </Row>
  </>);
};

export default SliderMobile;