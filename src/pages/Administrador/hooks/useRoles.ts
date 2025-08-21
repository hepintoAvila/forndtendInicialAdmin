import { useAuthContext, useNotificationContext } from '@/common/context';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { config, sendData } from '@/common/helpers/';
 
import { atom, useAtom } from 'jotai';
import { respRoles, Rol, UseRolProps } from '../Roles/type';
import Swal from 'sweetalert2';
export const RolesAtoms = atom<respRoles[]>([]);

 
export default function useRoles(locacion: string): UseRolProps {
    const [loading, setLoading] = useState(false);
    const [itemsRoles, setItemsRoles] = useAtom(RolesAtoms);
    const [rolSeleccionado, setRolSeleccionado] = useState<Rol | null>(null);
    const [showEditarRol, setShowEditarRol] = useState(false);
    const [datos, setDatos] = useState<Rol[]>([]);

    const location = useLocation();
    const navigate = useNavigate();

    const { showNotification } = useNotificationContext();
    const { isAuthenticatedUser } = useAuthContext();
    const redirectUrl = useMemo(() => location.state?.from?.pathname || `${locacion}`, [location.state]);

const sendDatos = useCallback(
    async (values: any, option: string, accion: string) => {
        await sendData<respRoles>({
            values,
            option,
            accion,
            setLoading,
            setItems: (items: respRoles[]) => {
             setItemsRoles(items);
            },
            navigate,
            redirectUrl,
            showNotification: (notification: { message: string; type: string }) => {
                showNotification({
                    message: notification.message,
                    type: notification.type as "error" | "info" | "success" | "default" | "loading"
                });
            },
        });
    },
    [navigate, redirectUrl, showNotification]
);

    const handleEdit = useCallback((rol: Rol) => {
        setRolSeleccionado(rol);
        setShowEditarRol(true);
    }, []);

    const handleSave = useCallback(
        (rolActualizado: Rol) => {
            // Lógica para guardar el rol actualizado
            setDatos(datos?.map((rol) => (rol.idRol === rolActualizado.idRol ? rolActualizado : rol)));
            setShowEditarRol(false);

            const configKey = rolActualizado.idRol === 0 ? config.API_OPCION_ADD_ROLES : config.API_OPCION_EDITAR_ROLES;
            sendDatos(rolActualizado as any, configKey, config.API_ACCION_ROLES);
        },
        [datos]
    );

    const handleDelete = useCallback((rolActualizado: Rol) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estás a punto de eliminar el rol "${rolActualizado.rol}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                sendDatos(rolActualizado as any, config.API_OPCION_DELETE_ROLES, config.API_ACCION_ROLES);
                setDatos(itemsRoles as any);
            }
        });
    }, []);

    const initialRoles = {
        idRol: 1,
        rol: 'null',
    } as respRoles;
    useEffect(() => {
        if (isAuthenticatedUser) {
            navigate(redirectUrl);
        }
    }, [isAuthenticatedUser, navigate, redirectUrl]);

    useEffect(() => {
        sendDatos(initialRoles as respRoles, config.API_OPCION_CONSULTA_ROLES, config.API_ACCION_ROLES);
    }, []);


    return {
        loading,
        redirectUrl,
        itemsRoles,
        setDatos,
        handleEdit,
        handleDelete,
        datos,
        rolSeleccionado,
        setShowEditarRol,
        showEditarRol,
        handleSave,
    };
}
