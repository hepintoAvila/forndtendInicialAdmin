import React from 'react';
import { Row } from 'react-bootstrap';
import { Pc } from './type';
import ComputadorCard from './ComputadorCard';

interface SidebarPcsProps {
  columnas: Pc[][];
  handleShowModal: (computador: Pc) => void;
}
  let fila = 0;
const SliderDesktop: React.FC<SidebarPcsProps> = ({ columnas, handleShowModal }) => {
  return (
      <Row>
        {columnas.map((columna, indexColumna) => (
          <div className="col-2" key={indexColumna}>
            {columna.map((computador, indexFila) => {
              fila++;
              return (
                <div className="mb-3"
                  key={indexFila + 1}
                >
                  <div onClick={() => handleShowModal(computador as Pc)}>
                    <ComputadorCard
                      key={indexFila}
                      computador={computador}
                      handleShowModal={handleShowModal}
                    />
                  </div>
                </div>
              );
            })}
            {fila >= 25 && (
              <div className="w-100 my-3" style={{ height: '50px' }}></div>
            )}
          </div>
        ))}
      </Row>
  );
};

export default SliderDesktop;