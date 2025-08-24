
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Pc {
  id_pc: string | undefined,
  numero?: number;
  ip: string;
  estado: 'Libre' | 'Ocupado';
}

export type PcList = Pc[];
export interface PcsData {
  id_pc: string | undefined,
   numero?: number;
  ip: string;
  estado: 'Libre' | 'Ocupado';
  status: 'Activo' | 'Inactivo';
  maj: Date;
}
export interface ApiResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Pcs: PcsData[];
  };
}
export interface AuthData {
  AppKey: string;
}
export interface PcsServiceResponse {
  status: 'success' | 'error';
  data?: {
    pcs: PcsData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  error?: string;
}

export interface PcsServiceInterface {
  Autentications: (values: UserProps) => Promise<PcsServiceResponse>;
}