// useBuscador.ts
import { useState } from 'react';

interface BuscadorState {
  programaSeleccionado: string;
  mesSeleccionado: string;
  setProgramaSeleccionado: (programa: string) => void;
  setMesSeleccionado: (mes: string) => void;
}

const useBuscador = (): BuscadorState => {
  const [programaSeleccionado, setProgramaSeleccionado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('');

  return {
    programaSeleccionado,
    mesSeleccionado,
    setProgramaSeleccionado,
    setMesSeleccionado,
  };
};

export default useBuscador;