import * as yup from 'yup';
const UsuariosFormSchema = yup.object({
  nom: yup.string().required('Por favor asigne el nom'),
  email: yup.string().required('Por favor asigne el email'),
  password: yup.string().required('Por favor asigne el pass'),

  });
  export type UsuariosFormFields = yup.InferType<typeof UsuariosFormSchema>;
  export { UsuariosFormSchema };