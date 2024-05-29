'use client'
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import SnackbarMUI from '@mui/material/Snackbar';

import Events from '@/lib/events';

import Alert from '../Alert';

const Snackbar = ({
  message: propMessage,
  severity: propSeverity,
  duration,
  anchorOrigin,
  ...restProps
}) => {
  const [open, setOpen] = React.useState(false);

  const [snackBarProps, setSnackBarProps] = useState({
    message: propSeverity,
    severity: propSeverity,
    duration,
  });

  useEffect(() => {
    Events.on('showSnackbar', 'showSnackbar', (props) => {
      setOpen(true);
      setSnackBarProps({
        ...snackBarProps,
        ...props,
      });
    });
    return () => {
      Events.remove('showSnackbar', 'showSnackbar');
    };
  }, [snackBarProps]);

  useEffect(() => {
    if (propMessage) {
      setOpen(true);
    }
  }, [propMessage]);

  const handleSnackBar = useCallback(() => setOpen(false), []);

  return (
    <SnackbarMUI
      open={open}
      onClose={handleSnackBar}
      autoHideDuration={snackBarProps?.duration}
      anchorOrigin={anchorOrigin}
      {...restProps}
    >
      <Alert severity={snackBarProps?.severity} sx={{ fontFamily: 'var(--font-Poppins-Medium)' }}>
        {snackBarProps?.message || propMessage}
      </Alert>
    </SnackbarMUI>
  );
};

Snackbar.defaultProps = {
  spacing: 2,
  message: '',
  severity: '',
  size: 'small',
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  TransitionComponent: 'SlideTransition',
  duration: 2000,
};

Snackbar.propTypes = {
  spacing: PropTypes.number,
  message: PropTypes.string,
  size: PropTypes.string,
  anchorOrigin: PropTypes.object,
  TransitionComponent: PropTypes.string,
  severity: PropTypes.string,
  duration: PropTypes.number,
};

export default Snackbar;
