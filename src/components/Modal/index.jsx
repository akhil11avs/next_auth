import * as React from 'react';
import ModalMUI from '@mui/material/Modal';

const Modal = ({ open, handleOpenOrClose, children, ...restProps }) => {
  return (
    <ModalMUI
      open={open}
      onClose={handleOpenOrClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...restProps}
    >
      {children}
    </ModalMUI>
  );
}

export default Modal;