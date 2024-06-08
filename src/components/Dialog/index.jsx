import DialogMUI from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import useResponsive from '@/customHook/useResponsive';
import { DialogActions } from '@mui/material';
import Button from '../Button';

const Dialog = ({ title, open, handleClose, children, isCrossIcon, sx, dialogAction, ...restProps }) => {
  const lgUp = useResponsive('up', 'lg');

  return (
    <DialogMUI
      onClose={!isCrossIcon && handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{
        sx: {
          position: "fixed",
          left: 15,
          right: 15,
          m: "0 auto",
          ...(lgUp && {
            maxHeight: "96%"
          }),
          ...sx
        },
      }}
      {...restProps}
    >
      {title && <DialogTitle sx={{ m: 0, p: 2, fontSize: '20px', fontFamily: 'var(--font-Poppins-Bold)' }} id="customized-dialog-title">
        {title}
      </DialogTitle>}
      {isCrossIcon && <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>}
      <DialogContent dividers sx={{ pt: 2 }}>
        {children}
      </DialogContent>
      {dialogAction?.length && <DialogActions>
        {dialogAction?.map((item, index) => (
          <Button key={index} size="medium" autoFocus onClick={item?.action}>
            {item?.title}
          </Button>
        ))}
      </DialogActions>}
    </DialogMUI>
  )
}

Dialog.defaultProps = {
  open: false,
  children: <span />,
  handleClose: () => { },
  isCrossIcon: false,
};

export default Dialog;