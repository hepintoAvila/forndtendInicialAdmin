
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
export interface Estudiante {
  id_estudiante: string;
  documento: string;
  nombres: string;
  email: string;
  programa: string;
  celular: string;
}
export interface EstudianteAtom {
  id_estudiante: string;
  documento: string;
  nombres: string;
  email: string;
  programa: string;
  celular: string;
}
export type UrlObjet = {
  accion?: string;
  _SPIP_PAGE?: string;
  action?: string;
  var_ajax?: string;
  bonjour?: string;
  opcion?: string;
  documento?: string;
}

export type EstudianteList = Estudiante[];

export interface EstudianteData {
  id_estudiante: number;
  documento: string;
  nombres: string;
  email: string;
  programa: string;
  celular: string;
}
 
export interface ApiEstudianteResponse {
  status: number;
  type: string;
  message: string;
  data: {
    Estudiantes: EstudianteData[];
  };
}

export interface EstudianteServiceResponse {
  status: 'success' | 'error';
  data?: {
    estudiantes: EstudianteData[];
    metadata: {
      statusCode: number;
      type: string;
      message: string;
    };
  };
  error?: string;
}

export interface EstudianteServiceInterface {
  Autentications: (values: UserProps) => Promise<EstudianteServiceResponse>;
}