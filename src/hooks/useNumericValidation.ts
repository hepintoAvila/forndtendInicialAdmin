import { useState } from 'react';

const useNumericValidation = () => {
  const [errors, setErrors] = useState({});

  const handleNumericValidation = (value: any, fieldName: any, setItems: (arg0: { (prevState: any): any; (prevState: any): any; }) => void, maxLength = 11) => {
    if (!/^[0-9]*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `El campo ${fieldName} solo debe contener números`,
      }));
      setItems((prevState: any) => ({
        ...prevState,
        [fieldName]: '', // Limpiar el campo si hay letras
      }));
    } else if (value.length > maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `El campo ${fieldName} no debe exceder los ${maxLength} caracteres`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }));
      setItems((prevState: any) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
  };

  return { errors, handleNumericValidation };
};

export default useNumericValidation;