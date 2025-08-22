import { useNotificationContext } from '@/common/context';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { config,sendData } from '@/common/helpers/';

import { atom, useAtom } from 'jotai';
 
import Swal from 'sweetalert2';
import { respUsuarios, UseUsuarioProps, Usuario } from '../Usuarios/formUsuarios/type';

export const UsuariosAtoms = atom<respUsuarios[]>([]);
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { Column } from 'react-table';
import { useAuth, useToggle } from '@/hooks';
 
 

export default function useUsuario(locacion: string): UseUsuarioProps {

    const [loading, setLoading] = useState(false);
    const [itemsUsuarios, setItemsUsuarios] = useAtom<respUsuarios[]>(UsuariosAtoms);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
    const [showEditarUsuario, setShowEditarUsuario] = useState(false);
    const [datos, setDatos] = useState<Usuario[]>([]);
   
    const [isOpenRegister, toggleRegister] = useToggle();
    const [isOpenImport, toggleImport] = useToggle();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('');
    const [previewData, setPreviewData] = useState<Usuario[] | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { showNotification } = useNotificationContext();
    const { isAuthenticated } = useAuth();
    const redirectUrl = useMemo(() => location.state?.from?.pathname || `${locacion}`, [location.state]);
    const sendDatos = useCallback(
            async (values: any, option: string, accion: string) => {
                await sendData<respUsuarios>({
                    values,
                    option,
                    accion,
                    setLoading,
                    setItems: (items: respUsuarios[]) => {
                    setItemsUsuarios(items);
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

    const handleEdit = useCallback((usuario: Usuario) => {
        setUsuarioSeleccionado(usuario);
        setShowEditarUsuario(true);
    }, []);

    const handleSave = useCallback(
        (usuarioActualizado: Usuario) => {
            setDatos(datos?.map((usuario) => (usuario.id_aspirante === usuarioActualizado.id_aspirante ? usuarioActualizado : usuario)));
            setShowEditarUsuario(false);

            const configKey = usuarioActualizado.id_aspirante === 0 ? config.API_OPCION_ADD_USUARIOS : config.API_OPCION_EDITAR_USUARIOS;
            sendDatos(usuarioActualizado as respUsuarios, configKey, config.API_ACCION_USUARIOS);
        },
        [datos]
    );

    const handleDelete = useCallback((id: number) => {
        const usuarioActualizado = datos.find((usuario) => usuario.id_aspirante === id);
        if (!usuarioActualizado) return;
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estás a punto de eliminar el usuario "${usuarioActualizado.primer_nombre} ${usuarioActualizado.primer_apellido}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                sendDatos(usuarioActualizado as respUsuarios, config.API_OPCION_DELETE_USUARIOS, config.API_ACCION_USUARIOS);
                setDatos(itemsUsuarios as any);
            }
        }); 
    }, []);

    const initialUsuarios: respUsuarios = {
        id_aspirante: 1,
        primer_nombre: 'null',
        segundo_nombre: 'null',
        primer_apellido: 'null',
        segundo_apellido: 'null',
        documento: 'null',
        tipo_documento: 'null',
        email: 'null',
        celular: 'null',
        pais: 'null',
        colegio: 'null',
        grado: 'null',
        discapacitado: 'null',
        statut: 'null',
        tipo: 'null',
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectUrl);
        }
    }, [isAuthenticated, navigate, redirectUrl]);

    useEffect(() => {
        sendDatos(initialUsuarios as respUsuarios, config.API_OPCION_CONSULTA_USUARIOS, config.API_ACCION_USUARIOS);
    }, []); 


	const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files || files.length === 0) return;
	
		const file = files[0];
		setFileName(file.name);
	
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: 'array' });
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const jsonData = XLSX.utils.sheet_to_json(worksheet) as Partial<any>[];
	
				// Validar el formato del archivo
				const requiredFields = ['id', 'identificacion', 'email', 'tipoUsuario'];
				if (jsonData.length > 0) {
					const firstItem = jsonData[0];
					const hasAllFields = requiredFields.every(field => field in firstItem);
					
					if (!hasAllFields) {
						toast.error('El archivo no tiene el formato correcto. Debe contener las columnas: id, identificacion, email,tipoUsuario');
						return;
					}
				}

				// Procesar los datos para mostrarlos en el modal antes de confirmar
				const usuariosToImport: any[] = jsonData.map((items: Partial<any>, index) => ({
					id: index, // Convertimos a number para que coincida con el tipo Usuario
					identificacion: items.identificacion || '',
					email: items.email || '',
					tipoUsuario: items.tipoUsuario || ''
					 }));
	
				// Mostrar vista previa en el modal
				setPreviewData(usuariosToImport);
				
				
			} catch (error) {
				console.error('Error al procesar el archivo:', error);
				toast.error('Error al procesar el archivo. Asegúrese de que es un archivo Excel o CSV válido.');
			}
		};
		reader.readAsArrayBuffer(file);
	};

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    

    const confirmImport = async () => {
        if (!previewData) return;
        
        // Aquí deberías enviar los datos al backend
        // Ejemplo:
		sendDatos(previewData, config.API_OPCION_IMPORTAR,config.API_ACCION_USUARIOS);
        ///console.log('previewData',previewData);
        // Por ahora solo los agregamos al state para mostrarlos
        setDatos(prev => [...(prev || []), ...previewData]);
        
        toast.success(`${previewData.length} usuarios importados correctamente`);
        setPreviewData(null);
        setFileName('');
        toggleImport();
        
        // Resetear el input de archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const columnsExport: ReadonlyArray<Column<any>> = [
        {
            Header: 'ID',
            accessor: 'id',
            defaultCanSort: true,
        },
        {
            Header: 'Identificación',
            accessor: 'identificacion',
            defaultCanSort: true,
        },
        {
            Header: 'Email',
            accessor: 'email',
            defaultCanSort: false,
        },
        {
            Header: 'Tipo Usuario',
            accessor: 'tipoUsuario',
            defaultCanSort: false,
        }
    ];
   
    return {
        loading,
        redirectUrl,
        itemsUsuarios, // Add this line
        setDatos,
        handleEdit,
        handleDelete,
        datos,
        usuarioSeleccionado,
        setShowEditarUsuario,
        showEditarUsuario,
        handleSave,
        toggleImport,
        isOpenImport, 
        toggleRegister,
        isOpenRegister, 
        triggerFileInput,
        fileInputRef, 
        fileName,
        handleFileImport,
        previewData,
        confirmImport,
        columnsExport  
    };
}