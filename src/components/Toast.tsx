"use client";

import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ToastProps {
  message: string | null;
  // Optional: type of toast (e.g., 'error', 'success', 'info', 'warning')
  severity?: 'error' | 'warning' | 'info' | 'success'; 
  duration?: number; // Duration in milliseconds, defaults to 5000
}

// Custom Alert component to match existing CSS classes if needed
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast: React.FC<ToastProps> = ({ message, severity = 'error', duration = 5000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!message) {
    return null; // Don't render anything if there's no message
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} className="toast-header">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {severity === 'error' ? 'Error' : 'Message'} {/* Default to Error or Message */}
          </Typography>
          {action}
        </Box>
        <Typography variant="body2" className="toast-body">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
