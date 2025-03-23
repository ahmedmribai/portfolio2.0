import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface ToastItemProps {
  type: ToastType;
}

const getToastColor = (type: ToastType) => {
  switch (type) {
    case 'success':
      return '#00f260';
    case 'error':
      return '#ff5555';
    case 'info':
    default:
      return '#0575e6';
  }
};

const ToastItem = styled(motion.div)<ToastItemProps>`
  padding: 16px 20px;
  background: rgba(20, 20, 20, 0.9);
  border-left: 4px solid ${props => getToastColor(props.type)};
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 280px;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(4px);
`;

const ToastIcon = styled.div`
  margin-right: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToastContent = styled.div`
  flex: 1;
  font-family: 'Raleway', 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 18px;
  margin-left: 8px;
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
  }
`;

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'fas fa-check-circle';
    case 'error':
      return 'fas fa-exclamation-circle';
    case 'info':
    default:
      return 'fas fa-info-circle';
  }
};

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem 
              key={toast.id}
              type={toast.type}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ToastIcon>
                <i className={getToastIcon(toast.type)} style={{ color: getToastColor(toast.type) }}></i>
              </ToastIcon>
              <ToastContent>{toast.message}</ToastContent>
              <CloseButton onClick={() => removeToast(toast.id)}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </ToastItem>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
