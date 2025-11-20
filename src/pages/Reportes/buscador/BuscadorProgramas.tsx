import React, { useContext, useEffect } from 'react';
 
import { BuscadorContext } from '../context/BuscadorContext';
import ProgramasMeses from '../ProgramasMeses';
import { Col, Row } from 'react-bootstrap';

interface Programa {
  PROG_NOMBRE: string;
  mes: string;
  turno_tipo: string;
  cantidad: string;
}

interface Props {
  programas: Programa[];
}

const BuscadorProgramas: React.FC<Props> = ({ programas }) => {
  const {
    programaSeleccionado,
    mesSeleccionado,
    setProgramaSeleccionado,
    setMesSeleccionado,
    setProgramas,
  } = useContext(BuscadorContext)!;
  
  const programasUnicos = [...new Set(programas?.map((programa) => programa.PROG_NOMBRE))];
  const mesesUnicos = [...new Set(programas?.map((programa) => programa.mes))].sort((a, b) => parseInt(a) - parseInt(b));
  const handleSelectPrograma = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProgramaSeleccionado(event.target.value);
    setMesSeleccionado('');
  };

  const handleSelectMes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesSeleccionado(event.target.value);
  };
  useEffect(() => {

    const filtrado = programas?.filter((programa: any) => programa.PROG_NOMBRE === programaSeleccionado && programa.mes === mesSeleccionado).map((programa: any) => (
   {
    PROG_NOMBRE: programa.PROG_NOMBRE,
    turno_tipo:  programa.turno_tipo,
    mes:  programa.mes,
    cantidad: programa.cantidad,
   }
))
     setProgramas(filtrado);
  }, [programas, setProgramas, programaSeleccionado, mesSeleccionado]);

  
  return (
    <div>
      <Row>
      <Col lg={10}>
      <select value={programaSeleccionado} onChange={handleSelectPrograma} className="select dropdown">
        <option value="">Seleccione un programa</option>
        {programasUnicos?.map((programa) => (
          <option key={programa} value={programa}>
            {programa}
          </option>
        ))}
      </select>
      </Col>
      <Col lg={2}>      
      {programaSeleccionado && (
        <select value={mesSeleccionado} onChange={handleSelectMes} className="select dropdown">
          <option value="">Seleccione un mes</option>
          {mesesUnicos?.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
        
      )}
       </Col>
      </Row>
      <Row>
      {programaSeleccionado && mesSeleccionado && (
        <div>
          
          <ProgramasMeses data={programas?.filter((programa: any) => programa.PROG_NOMBRE === programaSeleccionado && programa.mes === mesSeleccionado)}
            programaSeleccionado={programaSeleccionado}
            mesSeleccionado={mesSeleccionado}
            />
        </div>
      )}
      </Row>
    </div>
  );
};

export default BuscadorProgramas;