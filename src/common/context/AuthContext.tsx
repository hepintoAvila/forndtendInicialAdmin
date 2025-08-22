// AuthContext.tsx
import { createContext, useState } from 'react';

interface Credentials {
  login: string;
  password: string;
}

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  credentials: Credentials | null;
  setCredentials: (credentials: Credentials | null) => void;
  clearCredentials: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: AuthContextProps) => {
    const [credentials, setCredentials] = useState<Credentials | null>(null);
    const clearCredentials = () => {
    setCredentials(null);
  };
  return (
    <AuthContext.Provider value={{credentials, setCredentials, clearCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };