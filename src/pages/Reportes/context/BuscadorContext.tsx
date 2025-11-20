// BuscadorContext.ts
import { createContext, useState } from 'react';
 
interface Programa {
  PROG_NOMBRE: string;
  mes: string;
  turno_tipo: string;
  cantidad: string;
}

interface BuscadorState {
  programaSeleccionado: string;
  mesSeleccionado: string;
  programas: Programa[];
  setProgramaSeleccionado: (programa: string) => void;
  setMesSeleccionado: (mes: string) => void;
  setProgramas: (programas: Programa[]) => void; // Cambia Programa a Programa[]
}

const BuscadorContext = createContext<BuscadorState | null>(null);

const BuscadorProvider = ({ children }: { children: React.ReactNode }) => {
  const [programaSeleccionado, setProgramaSeleccionado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [programas, setProgramas] = useState<Programa[]>([]);

  return (
    <BuscadorContext.Provider
      value={{
        programaSeleccionado,
        mesSeleccionado,
        programas,
        setProgramaSeleccionado,
        setMesSeleccionado,
        setProgramas,
      }}
      
    >
      {children}
    </BuscadorContext.Provider>
  );
};

export { BuscadorProvider, BuscadorContext };