import React from 'react';
 
import { ApiVisitaResponseData } from '@/common/type/type._visitas';
import EstudVisitaForm from './EstudVisitaForm';
import { ProgramaList } from '@/common/type/type._programas';
 
interface FormTabsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeDocumento: (documento: string) => void;
  documentoAnterior: any;
  estudiantes: { documento: string }[] | undefined;
  handleSubmitEstudent: (event: React.FormEvent<HTMLFormElement>) => void;
  programas: ProgramaList[];
  visitas: ApiVisitaResponseData;
}

const TabsVisitas = ({
  handleSubmit,
  onChangeDocumento,
  documentoAnterior,
  estudiantes,
  handleSubmitEstudent,
  programas,
  visitas,
}: FormTabsProps) => {
  return (
      <EstudVisitaForm
            handleSubmit={handleSubmit}
            onChangeDocumento={onChangeDocumento}
            documentoAnterior={documentoAnterior}
            estudiantes={estudiantes}
            programas={programas as any}
          />
  );
};

export default TabsVisitas;