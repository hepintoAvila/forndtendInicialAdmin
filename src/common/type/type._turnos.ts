
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Turno {
 documento: number;
  pc: number;
  fecha_inicial: string;
  fecha_final: string;
}

export type TurnoList = Turno[];

export interface TurnoData {
    documento?: number;
    pc: number;
    fecha_inicial: string;
    fecha_final: string; 
}
export interface ApiTurnoResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Turno: TurnoData[];
  };
}
export interface AuthData {
  AppKey: string;
}

export type TurnoRequestDatos = {
  documento: any;
  pc: any;
  fecha_final: Date;
  fecha_inicial: Date;
};

export type TurnoRequest = {
  accion: string;
  opcion: string;
};
export interface BodyData {
    documento: number;
    pc: number;
    fecha_inicial: Date;
    fecha_final: Date;
}

export interface TurnoServiceResponse {
  message(message: any): unknown;
  status: 'success' | 'error';
  data?: {
    turno: TurnoData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  error?: string;
}

export interface TurnoServiceInterface {
  Autentications: (values: UserProps) => Promise<TurnoServiceResponse>;
}
interface TurnoResp {
  id_turno: string;
  numero: string;
  nombre_estudiante: string;
  fecha_inicial?: Date;
  fecha_final?: Date;
  sala: string;
  statut: string;
}

interface TurnoResponseData {
  Turno: TurnoResp[];
}

export interface ApiTurnoResponseData {
  status: number;
  type: string;
  data: TurnoResponseData;
  message?: string;
}