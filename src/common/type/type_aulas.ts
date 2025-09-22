
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface AulaPrestamo {
  id: number;
  title: string;
  start?: Date | string | string[] | undefined;
  end?: Date | string | string[]| undefined;
  documento?: number | string | string[]| undefined;
  className: string;
}  
export interface Aula {
  id: number;
  title: string;
  className: string;
  textClass: string;
}
export type AulaList = Aula[];
export type AulaPrestamoList = AulaPrestamo[];

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
    Prestamos: AulaPrestamo[];
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
    prestamos: AulaPrestamo[];
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
  prestamos: AulaPrestamo[];
}

export interface ApiAulaResponseData {
  status: number;
  type: string;
  data: AulaResponseData;
  message?: string;
}