import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '../Modal';
import { Box } from '@mui/material';

const Loader = () => {
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
          width: '60%',
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
          fontWeight: 'bold'
        }}
        >
          Please wait....
        </div>
      </Box>
    </Modal>
  )
}

export default Loader
