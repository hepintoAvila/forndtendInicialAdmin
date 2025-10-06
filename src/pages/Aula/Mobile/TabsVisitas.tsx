import React from 'react';
 

import EstudVisitaForm from './EstudVisitaForm';
import { ProgramaList } from '@/common/type/type._programas';
type Usuario = {
  Nom: string;
  Email: string;
  Rol: string;
  status: string;
  AppKey: string;
};

type Usuarios = Usuario[];
interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: { documento: string }[] | undefined;
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  programas: ProgramaList[];
  usuario: Usuarios;
  computadores: any;
}

const TabsVisitas = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  computadores,
  programas,
  usuario
}: FormTabsProps) => {
  return (
     <>
     <EstudVisitaForm
      handleSubmit={handleSubmit}
      onChangeDocumento={onChangeDocumento}
      documentoAnterior={documentoAnterior}
      estudiantes={estudiantes}
      usuario={usuario as any}
      computadores={computadores as any}
      programas={programas as any} />
      </>
  );
};

export default TabsVisitas;