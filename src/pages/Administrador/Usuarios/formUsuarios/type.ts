import { Column } from "react-table";

export type usuarios = {
    id_aspirante: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    documento: string;
    tipo_documento: string;
    email: string;
    celular: string;
    pais: string;
    colegio: string;
    grado: string;
    discapacitado: string;
    statut: string;
    tipo: string;
}[];

export type Usuario = {
    id_aspirante: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    documento: string;
    tipo_documento: string;
    email: string;
    celular: string;
    pais: string;
    colegio: string;
    grado: string;
    discapacitado: string;
    statut: string;
    tipo: string;
};

export type respUsuarios = {
    id_aspirante: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    documento: string;
    tipo_documento: string;
    email: string;
    celular: string;
    pais: string;
    colegio: string;
    grado: string;
    discapacitado: string;
    statut: string;
    tipo: string;
};

export type UseUsuarioProps = {
   loading: boolean;
    redirectUrl: string;
    itemsUsuarios: respUsuarios[];
    setDatos: React.Dispatch<React.SetStateAction<Usuario[]>>;
    handleEdit: (usuario: Usuario) => void;
    handleDelete: (id: number) => void;
    datos: Usuario[];
    usuarioSeleccionado: Usuario | null;
    setShowEditarUsuario: React.Dispatch<React.SetStateAction<boolean>>;
    showEditarUsuario: boolean;
    handleSave: (usuarioActualizado: Usuario) => void;
    toggleImport: () => void;
    isOpenImport: boolean;
    toggleRegister: () => void;
    isOpenRegister: boolean;
    triggerFileInput: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    fileName: string;
    handleFileImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    previewData: Usuario[] | null;
    confirmImport: () => void;
    columnsExport: ReadonlyArray<Column<any>>;
};