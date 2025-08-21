import { createContext, useContext, useState, ReactNode } from 'react';

interface SecurityError {
  hasSpecialChar?: boolean;
  isEmpty?: boolean;
  [key: string]: any;
}

// Update the context type to allow undefined values for specific fields
interface SecurityContextType {
  checkSpecialChars: (name: string, value: string) => void;
  errors: Record<string, SecurityError | undefined>;
  clearErrors: (name: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  // Update the state type to allow undefined values
  const [errors, setErrors] = useState<Record<string, SecurityError | undefined>>({});

  const checkSpecialChars = (name: string, value: string) => {
    const newErrors: SecurityError = {};
    
    // Check for empty value
    if (!value.trim()) {
      newErrors.isEmpty = true;
    }
    
    // Check for special characters (customize this regex as needed)
    if (/[<>$#@!%^&*()_+=[\]{}|\\;:'",/?]/.test(value)) {
      newErrors.hasSpecialChar = true;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: Object.keys(newErrors).length > 0 ? newErrors : undefined
    }));
  };

  const clearErrors = (name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return (
    <SecurityContext.Provider value={{ checkSpecialChars, errors, clearErrors }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};