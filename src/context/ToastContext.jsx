import React from 'react';
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast({ type, title, description, timeout = 3000 }) {
    const id = Date.now();

    setToasts((prev) => [
      {
        id,
        type,
        title,
        description,
      },
      ...prev,
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, timeout);
  }

  function closeToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.description}</p>
            </div>

            <button type="button" onClick={() => closeToast(toast.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
