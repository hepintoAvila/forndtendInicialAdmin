type Evaluacion = {
    id_aspirante: number;
    id_pregunta: number;
    area: number;
    nivel: string;
    cuestionario: string;
    titulo: string;
    respuesta: string;
    solucion: string;
  };
  
  type Aspirante = {
    id_aspirante: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    documento: string;
    tipo_documento: string;
    celular: string;
    pais: string;
    colegio: string;
    grado: string;
    statut: string;
    Evaluaciones: Evaluacion[];
  };