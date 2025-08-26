
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Programa {
  id: number;
  programa: string;
}

export type ProgramaList = Programa[];

export interface ProgramaData {
  id: number;
  programa: string;
}
export interface ApiProgramaResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Programas: ProgramaData[];
  };
}
export interface AuthData {
  AppKey: string;
}

export type ProgramaRequestDatos = {
  id: number;
  programa: string;
};

export type ProgramaRequest = {
  accion: string;
  opcion: string;
};
export interface BodyData {
    id: number;
    programa: string;
}

export interface ProgramaServiceResponse {
  message?: string; 
  status: 'success' | 'error';
  error?: string;
  data?: {
    programas: ProgramaData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  
}

export interface ProgramaServiceInterface {
  Autentications: (values: UserProps) => Promise<ProgramaServiceResponse>;
}

interface ProgramaResp {
    id: number;
    programa: string;
}

interface ProgramaResponseData {
  Programas: ProgramaResp[];
}

export interface ApiProgramaResponseData {
  status: number;
  type: string;
  data: ProgramaResponseData;
  message?: string;
}