
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Visita {
  id_visita: string;
  identificacion: string;
  tipo_visita: string;
  jornada: string;
  ubicacion: string;
  programa: string;
  fecha_creacion: string;
}

export type VisitaList = Visita[];

export interface VisitaData {
  id_visita: string;
  identificacion: string;
  tipo_visita: string;
  jornada: string;
  ubicacion: string;
  programa: string;
  fecha_creacion: string;    
}
export interface ApiVisitaResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Visitas: VisitaData[];
  };
}
export interface AuthData {
  AppKey: string;
}

export type VisitaRequestDatos = {
  id_visita: string;
  identificacion: string;
  tipo_visita: string;
  jornada: string;
  ubicacion: string;
  programa: string;
  fecha_creacion: string;
};

export type VisitaRequest = {
  accion: string;
  opcion: string;
};
export interface BodyData {
  id_visita: string;
  identificacion: string;
  tipo_visita: string;
  jornada: string;
  ubicacion: string;
  programa: string;
  fecha_creacion: string;
}

export interface VisitaServiceResponse {
  message?: string; 
  status: 'success' | 'error';
  error?: string;
  data?: {
    visitas: VisitaData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  
}

export interface VisitaServiceInterface {
  Autentications: (values: UserProps) => Promise<VisitaServiceResponse>;
}
interface VisitaResp {
  id_visita: string;
  identificacion: string;
  tipo_visita: string;
  jornada: string;
  ubicacion: string;
  programa: string;
  fecha_creacion: string;
}

interface VisitaResponseData {
  Turno: VisitaResp[];
}

export interface ApiVisitaResponseData {
  status: number;
  type: string;
  data: VisitaResponseData;
  message?: string;
}