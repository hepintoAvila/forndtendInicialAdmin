import React, { createContext, useState, useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// Tipos
interface NotificationConfig {
  message?: string;
  title?: string;
  variant?: string;
  delay?: number;
}

interface NotificationType {
  type: 'error' | 'info' | 'success' | 'default' | 'loading';
}

interface NotificationContextProps {
  showNotification: (config: NotificationType & Partial<NotificationConfig>) => void;
}

// Contexto
const NotificationContext = createContext<NotificationContextProps | null>(null);

// Componente Toaster
interface ToasterProps {
  show: boolean;
  message?: string;
  title?: string;
  variant?: string;
  delay?: number;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({
  show,
  message,
  title,
  variant = 'light',
  delay = 5000,
  onClose,
}) => {
  return (
    <ToastContainer position="top-center">
      <Toast bg={variant.toLowerCase()} delay={delay} show={show} onClose={onClose} autohide>
        {title && (
          <Toast.Header>
            <strong>{title}</strong>
          </Toast.Header>
        )}
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

// Componente Preloader
const Preloader: React.FC = () => {
  return (
    <div
      className="preloader"
      id="preloader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo blanco tenue
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

// Proveedor de notificación
interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [toasterConfig, setToasterConfig] = useState<NotificationConfig>({
    message: '',
  });

  const showNotification = ({
    title,
    message,
    type,
  }: NotificationType & Partial<NotificationConfig>) => {
    if (type === 'loading') {
      setShowPreloader(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 3000);
    } else {
      setToasterConfig({
        message,
        title,
      });
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const handleToasterClose = () => {
    setShowToaster(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {showPreloader && <Preloader />}
      {showToaster && (
        <Toaster
          show={showToaster}
          message={toasterConfig.message}
          title={toasterConfig.title}
          onClose={handleToasterClose}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para utilizar el contexto
const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within an NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotificationContext };