export type respRoles = {
    rol: any;
    idRol: any;
    Roles: {
    idRol: number;
    rol: string;
    }[];
};
export type roles = [
    {
        idRol: number;
        rol?: string;
    },
];
export type Rol = {
    idRol: number;
    rol?: string;
};
export interface UseRolProps {
    loading: boolean;
    redirectUrl: string;
    itemsRoles: respRoles[];
    setDatos: (datos: Rol[]) => void;
    handleEdit: (rol: Rol) => void;
    handleDelete: (rol: Rol) => void;
    datos: Rol[];
    rolSeleccionado: Rol | null;
    setShowEditarRol: (show: boolean) => void;
    showEditarRol: boolean;
    handleSave: (rol: Rol) => void;
}
