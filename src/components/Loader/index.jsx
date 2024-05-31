'use client';
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import useResponsive from '@/customHook/useResponsive';

import Box from '../Box';
import Modal from '../Modal';

const Loader = () => {
  const lgUp = useResponsive('up', 'lg');
  return (
    <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: lgUp ? '16%' : '54%',
          backgroundColor: 'white',
          p: 2,
          boxSizing: 'unset',
        }}
      >
        <CircularProgress disableShrink />
        <div style={{
          lineHeight: '1.2em',
          display: 'block',
          overflow: 'hidden',
          paddingLeft: '20px',
          fontFamily: 'var(--font)',
          fontWeight: 600
        }}
        >
          Please wait....
        </div>
      </Box>
    </Modal>
  )
}

export default Loader
