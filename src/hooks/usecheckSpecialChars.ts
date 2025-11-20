import { useState } from 'react';

const usecheckSpecialChars = (field: string, value: any) => {
    const [errors, setErrors] = useState({});
   
    const validationSpecialChars = (field: string, value: any) => {
        const stringValue = String(value).trim(); // Convertir value a cadena de texto y eliminar espacios en blanco
        let fieldErrors = { hasSpecialChar: false, isEmpty: false };
        if (stringValue === '') {
          fieldErrors.isEmpty = true;
        } else if (field !== 'fecha' && /[^a-zA-Z0-9\s.,:áéíóúÁÉÍÓÚñÑ@]/.test(stringValue)) {
          fieldErrors.hasSpecialChar = true;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: fieldErrors,
        }));
      };
    return { errors, validationSpecialChars };
};

export default usecheckSpecialChars;