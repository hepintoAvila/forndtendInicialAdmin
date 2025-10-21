import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Pc } from './type';
import ComputadorCard from './ComputadorCard';

interface SidebarPcsProps {
  columnas: Pc[][];
  handleShowModal: (computador: Pc) => void;
  consultState: () => void;
}
 
  let fila = 0;
const SliderDesktop: React.FC<SidebarPcsProps> = ({ columnas, handleShowModal,consultState }) => {
 	const handleOtherClick = (e: MouseEvent) => {
    const menuNodeRef = document.getElementById('SliderDesktop');
		if (menuNodeRef && menuNodeRef.contains(e.target as Node))
			return;
		// else hide the menubar
		if (document.body) {
     consultState();
			document.body.classList.remove('sidebar-enable');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOtherClick, false);
		return () => {
			document.removeEventListener('mousedown', handleOtherClick, false);
		};
	}, []);
  return (
      <Row>
        {columnas?.map((columna, indexColumna) => (
           <div className="col-2" key={indexColumna} id='SliderDesktop'>
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
 