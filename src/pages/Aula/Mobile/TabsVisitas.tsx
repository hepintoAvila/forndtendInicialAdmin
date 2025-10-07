import React from 'react';
 

import EstudVisitaForm from './EstudVisitaForm';
import { ProgramaList } from '@/common/type/type._programas';
interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  handleSelectChangeRol: (event: string) => void;
  handleSelectPrograma: (event: string) => void;
  documentoAnterior: any;
  programas: ProgramaList[];
  computadores: any;
}

const TabsVisitas = ({
  handleSubmit,
  onChangeDocumento,
  handleSelectPrograma,
  handleSelectChangeRol,
  documentoAnterior,
  computadores,
  programas,
}: FormTabsProps) => {
  return (
     <>
     <EstudVisitaForm
      handleSubmit={handleSubmit}
      onChangeDocumento={onChangeDocumento}
      handleSelectChangeRol={handleSelectChangeRol}
      handleSelectPrograma={handleSelectPrograma}
      documentoAnterior={documentoAnterior}
      computadores={computadores as any}
      programas={programas as any} />
      </>
  );
};

export default TabsVisitas;