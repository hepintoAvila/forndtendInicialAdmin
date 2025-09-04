
export type UserProps = {
  login?: string;
  password?: string;
};
export type Credentials = {
  login?: string;
  password?: string;
};
interface Trend {
  textClass: string;
  icon: string;
  value: string;
}

interface ChartWidget {
  title: string;
  description: string;
  stats: string;
  trend: Trend;
  colors: string[];
  data: [];
}
export interface ChartWidgetData {
  title: string;
  description: string;
  stats: string;
  trend: Trend;
  colors: string[];
  data: [];
  dataTotales: [];
  dataColors: [];
  dataMeses: [];
  dataProgramas: [];
}
export interface SendData {
  programa: string;
}
export interface ApiResponse {
  status: number;
  type: string;
  data: {
    chartwidget: ChartWidget[];
  };
  message?: string;
}
export interface ReporteServiceResponse {
 message?: string;
  status: 'success' | 'error';
  data?: {
    chartwidget: ChartWidget[];
    metadata: {
      statusCode: number;
      type: string;
       message?: string;
    };
  };
  error?: string;
}

export interface ReporteServiceInterface {
  Autentications: (values: UserProps) => Promise<ReporteServiceResponse>;
}
 

export interface DataProgramas {
  PROG_NOMBRE: string | null;
  turno_tipo: string;
  cantidad: string;
  mes: string;
}

export interface Reporte {
  title: string;
  description: string;
  stats: string;
  trend: {
    textClass: string;
    icon: string;
    value: string;
  };
  colors: string[];
  data: [];
  dataTotales: [];
  dataColors: [];
  dataMeses: [];
  dataProgramas: [];
}
