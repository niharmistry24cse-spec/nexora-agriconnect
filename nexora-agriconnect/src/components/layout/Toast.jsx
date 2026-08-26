import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className={`toast-banner toast-${toast.type}`}>
      {toast.type === 'success' ? (
        <CheckCircle2 size={18} />
      ) : toast.type === 'danger' ? (
        <AlertCircle size={18} />
      ) : (
        <Info size={18} />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
