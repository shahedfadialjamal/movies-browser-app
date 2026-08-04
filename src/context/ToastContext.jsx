import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(type, title, description) {
    setToast({
      type,
      title,
      description,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  function closeToast() {
    setToast(null);
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-content">
            <h4>{toast.title}</h4>
            <p>{toast.description}</p>
          </div>
          <button onClick={closeToast}>✕</button>
        </div>
      )}
    </ToastContext.Provider>
  );
}
export function useToast() {
  return useContext(ToastContext);
}
