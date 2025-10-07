import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNotificationContext } from '@/common';
import useLoginEmail from '@/hooks/useLoginEmail';
import { useLogout } from '@/hooks';

const useFormState = (usuario: any) => {
    const logout = useLogout();
    const { showNotification } = useNotificationContext();
   const { handleSubmitSolicitud} = useLoginEmail();
    const [ubicacion, setUbicacion] = useState('');
    const [bienvenido, setBienvenido] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [pc, setPc] = useState(0);
    const [formData, setFormData] = useState({
        ubicacion: '',
        motivo: '',
        pc: 0,
    });

    interface Data {
        Nom: string;
        Email: string;
        Rol: string;
        status: string;
        AppKey: string;
    }

    const validateForm = (computador: any, ubicacion: any, motivo: any, usuario: any): any => {
        
        const emails = usuario?.data?.auth && Array.isArray(usuario.data.auth) ? usuario.data.auth.map((item:Data) => item.Email) : [];


        if (!emails || emails.length === 0) {
            Swal.fire({
                title: 'Error',
                text: `No se encontró el correo electrónico del usuario`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }

        if (!ubicacion) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, seleccione una ubicación`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }

        if (!motivo) {
            Swal.fire({
                title: 'Error',
                text: `Por favor, ingrese un motivo`,
                icon: 'error',
                timer: 2000,
            });
            return null;
        }

        setPc(computador.numero);
        setBienvenido(true);

        return {
            ubicacion,
            motivo,
            pc: computador.numero,
            email: emails[0],
        };
    };

    const handleSelectComputador = (computador: any) => {
        Swal.fire({
            title: 'PC seleccionado',
            text: `Se seleccionó el PC No. ${computador.numero}`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000,
        });

        const formData = validateForm(computador, ubicacion, motivo, usuario);
         if (formData) {
            handleSubmitSolicitud(formData);
            setBienvenido(true);
            setTimeout(async () => {
                await logout();
            }, 2000); // 2000 milisegundos = 2 segundos
        }
    };

    const handleFormChange = (step: any, data: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, [step]: data }));
        if (step === 'ubicacion') setUbicacion(data);
        if (step === 'motivo') setMotivo(data);
        setBienvenido(false);
    };

const handleSubmitForm = async () => {
    const formData = validateForm(0, ubicacion, motivo, usuario);
    if (formData) {
        handleSubmitSolicitud(formData);
        setBienvenido(true);
        setTimeout(async () => {
            await logout();
        }, 2000); // 2000 milisegundos = 2 segundos
    }
};

    return {
        ubicacion,
        setUbicacion,
        bienvenido,
        setBienvenido,
        motivo,
        setMotivo,
        pc,
        setPc,
        formData,
        handleSelectComputador,
        handleFormChange,
        handleSubmitForm,
        showNotification,
    };
};

export default useFormState;
