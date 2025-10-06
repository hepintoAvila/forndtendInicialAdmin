 
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNotificationContext} from '@/common';
const useFormState = () => {
      const { showNotification } = useNotificationContext();
      
  const [ubicacion, setUbicacion] = useState('');
  const [bienvenido, setBienvenido] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [pc, setPc] = useState(0);
  const [formData, setFormData] = useState({
    ubicacion: '',
    motivo: '',
    pc: 0,
  });

  const handleSelectComputador = (computador: any) => {
    Swal.fire({
        title: 'PC seleccionado',
        text: `Se seleccionó el PC No. ${computador.numero}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 2000, // El mensaje se cerrará automáticamente después de 2 segundos
        });
    setPc(computador.numero);
    setBienvenido(true);
       const formData = {
      ubicacion,
      motivo,
      pc:computador.numero,
    };
     console.log('formData', formData);
  };

  const handleFormChange = (step: any, data: any) => {
    setFormData((prevFormData) => ({ ...prevFormData, [step]: data }));
    if (step === 'ubicacion') setUbicacion(data);
    if (step === 'motivo') setMotivo(data);
    setBienvenido(false);
  };

  const handleSubmitForm = () => {
    const formData = {
      ubicacion,
      motivo,
      pc,
    };
    console.log('formData', formData);
    setBienvenido(true);
    // Aquí puedes agregar la lógica para enviar los datos a un servidor o realizar alguna otra acción
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