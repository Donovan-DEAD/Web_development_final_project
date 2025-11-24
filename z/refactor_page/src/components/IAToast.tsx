"use client";

import React from 'react';
import Toast from './Toast'; // Assuming Toast.tsx is in the same directory

interface IAToastProps {
  message: string | null;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const IAToast: React.FC<IAToastProps> = ({ message, severity = 'info' }) => {
  // This component acts as a wrapper around the generic Toast component
  // to provide a specific context or default styling for IA assistance toasts.
  // The original EJS partial was largely a container for a Bootstrap toast.

  // The Toast component already handles the display logic (open/close, duration).
  // We just need to pass the message and desired severity.
  return (
    <Toast message={message} severity={severity} />
  );
};

export default IAToast;
