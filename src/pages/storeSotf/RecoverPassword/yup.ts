import * as yup from 'yup';
const updateFormSchema = yup.object({
  login: yup.string().required('Por favor, digite su email').email('El email no es válido'),
  newpassword: yup.string().required('Por favor, digite su password').min(8, 'La contraseña debe tener al menos 8 caracteres'),
  primer_nombre: yup.string().required('Por favor, digite su primer nombre'),
  segundo_nombre: yup.string(),
  primer_apellido: yup.string().required('Por favor, digite su primer apellido'),
  segundo_apellido: yup.string(),
  direccion: yup.string().required('Por favor, digite su dirección'),
  celular: yup.string().required('Por favor, digite su número de celular').matches(/^[0-9]+$/, 'El número de celular no es válido'),
  // fecha_nacimiento: yup.date().required('Por favor, seleccione su fecha de nacimiento'),
});
  export type BitacoraFormFields = yup.InferType<typeof updateFormSchema>;
  export { updateFormSchema }