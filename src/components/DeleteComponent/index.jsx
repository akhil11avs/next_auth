import Dialog from "@/components/Dialog";
import Typography from "@/components/Typography";

const DeleteComponent = ({
  open,
  title,
  content,
  isCrossIcon = true,
  handleOpenOrClose,
  dialogActions,
  sx
}) => {
  return (
    <Dialog
      open={open}
      isCrossIcon={isCrossIcon}
      title={title}
      handleClose={handleOpenOrClose}
      sx={{
        ...sx,
      }}
      dialogAction={dialogActions}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontFamily: "var(--font-Poppins-Regular)",
        }}
      >
        {content}
      </Typography>
    </Dialog>
  );
};

export default DeleteComponent;
