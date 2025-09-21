
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Aula {
  id: number;
  title: string;
  className: string;
  textClass: string;
}
export type AulaList = Aula[];

export interface AulaData {
  id: number;
  title: string;
  className: string;
  textClass: string;
}
export interface ApiAulaResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Aulas: AulaData[];
  };
}
export interface AuthData {
  AppKey: string;
}

export type AulaRequestDatos = {
  id: number;
  programa: string;
};

export type AulaRequest = {
  accion: string;
  opcion: string;
};
export interface BodyData {
    id: number;
    programa: string;
}

export interface AulaServiceResponse {
  message?: string; 
  status: 'success' | 'error';
  error?: string;
  data?: {
    aulas: AulaData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  
}

export interface AulaServiceInterface {
  Autentications: (valus:Credentials) => Promise<AulaServiceResponse>;
}

interface AulaResp {
  id: number;
  title: string;
  className: string;
  textClass: string;
}

interface AulaResponseData {
  aulas: AulaResp[];
}

export interface ApiAulaResponseData {
  status: number;
  type: string;
  data: AulaResponseData;
  message?: string;
}