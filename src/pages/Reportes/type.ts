
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  var_login?: string;
  password?: string;
};
interface Trend {
  textClass: string;
  icon: string;
  value: string;
}

interface DataPrograma {
  PROG_NOMBRE: string;
  mes: string;
  turno_tipo: string;
  cantidad: string;
}

interface DataMes {
  [key: string]: string | number;
}

export interface ChartWidget {
  title: string;
  description: string;
  stats: string;
  trend: Trend;
  colors: string[];
  data: string[];
  dataTotales: number[];
  dataColors: string[];
  dataMeses: DataMes[];
  dataProgramas: DataPrograma[];
}

export interface LibroVisitas {
  title: string;
  description: string;
  stats: number;
  trend: Trend;
  colors: string[];
  data: number[];
  dataTotales?: number[];
  dataColors?: string[];
  dataMeses?: DataMes[];
  dataProgramas?: DataPrograma[];

}export interface Historicos {
  title: string;
  description: string;
  stats: number;
  trend: Trend;
  colors: string[];
  data: [];
  dataTotales?: number[];
  dataColors?: string[];
  dataMeses?: DataMes[];
  dataProgramas?: DataPrograma[];
}

interface ResponseData {
  chartwidget: ChartWidget[];
  libroVisitas: LibroVisitas[];
}

export interface Response {
  status: number;
  type: string;
  data: ResponseData;
  message?: string;
}

export interface ApiResponse {
  status: number;
  type: string;
  data: ResponseData;
  message?: string;
}

export interface ReporteServiceResponse {
  message?: string;
  status: 'success' | 'error';
  data?: {
    chartwidget: ChartWidget[];
    libroVisitas?: LibroVisitas[];
    metadata: {
      statusCode: number;
      type: string;
      message?: string;
    };
  };
  error?: string;
}
interface ResponseHistoData {
  Historicos: Historicos[];
}
export interface ApiHistoResponse {
  historicos: ReporteServiceHistoResponse;
  status: number;
  type: string;
  data: ResponseHistoData;
  message?: string;
}
export interface ReporteServiceHistoResponse {
  message?: string;
  status: 'success' | 'error';
  data?: {
    historicos?: Historicos[];
    metadata: {
      statusCode: number;
      type: string;
      message?: string;
    };
  };
  error?: string;
}