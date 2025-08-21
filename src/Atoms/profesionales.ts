/*
import { UsuarioUpdate } from '@/pages/Administrador/Usuarios/formUsuarios/type';
import { atom } from 'jotai'
interface Opcion {
    respuesta: string;
    ponderacion: string;
  }
  
  interface PreguntaContexto {
  id_contexto: number | null;
  nivelpregunta: string | null;
  areapregunta: string | null;
  id_contexto_grupo: number | null;
  descripcion_contexto_grupo: string | null;
  recurso_tipo_contexto_grupo: string | null;
  recurso_contexto_grupo: string | null;
  contexto_enunciado_individual: string | null;
  enunciado_individual: string | null;
  recurso_pregunta: string | null;
  recurso_tipo_pregunta: string | null;
  statut: string | null;
}
type Respuestas ={
      id_pregunta: string;
    id_evaluacion: string;
    texto_pregunta: string;
    tipo: string;
    tipo_pregunta: string;
    orden: string;
    opciones: Opcion[];
    PreguntaContexto: PreguntaContexto[];
}
type pregunta ={
      id_pregunta: string;
    id_evaluacion: string;
    texto_pregunta: string;
    tipo: string;
    tipo_pregunta: string;
    orden: string;
    opciones: Opcion[];
}
  export interface Pregunta {

    Evaluaciones:pregunta[];
    Columnas: ColumnasEvaluaciones[];
    CamposEnum: EnumValues[];
  }[];
interface ColumnasEvaluaciones{
  Header:  string;
  accessor:  string;
  defaultCanSort: boolean;
}
type EnumValues = {
  [key: string]: string[];
};

type  SetEvaluaciones = {
  Evaluaciones: [];
  Columnas: ColumnasEvaluaciones[];
  CamposEnum: EnumValues[];
}

interface Opcion {
  id_opcion: string;
  id_pregunta: string;
  id_evaluacion: string;
  texto_opcion: string;
  ponderacion: string;
  opcion: string;
}

interface OpcionesProps {
  opciones: { [key: string]: Opcion } & { opcion: string[] };
  setOpciones: (opciones: { [key: string]: Opcion } & { opcion: string[] }) => void;
}

type  SetRespuestas = {
  Evaluaciones: [];
  Columnas: ColumnasEvaluaciones[];
  CamposEnum: EnumValues[];
  Respuestas: OpcionesProps[];
}

export const SetRespuestas = atom<SetRespuestas[]>([]);
export const EnumValues = atom<EnumValues[]>([]);
export const ColumnasEvaluaciones = atom<ColumnasEvaluaciones[]>([]);
export const UsuarioActualiza = atom<UsuarioUpdate[]>([]);
export const ItmsEvaluaciones = atom<SetEvaluaciones[]>([]);
export const itemsPregunta = atom<Pregunta[]>([]);
export const Respuestas = atom<Respuestas>();
*/

