"use client";
import React from "react";

import Dialog from "@/components/Dialog";
import Typography from "@/components/Typography";
import useResponsive from "@/customHook/useResponsive";

const DeleteCity = ({ open, handleOpenOrClose, dialogActions }) => {
  const lgUp = useResponsive('up', 'lg');
  return (
    <Dialog
      open={open}
      title="Delete City"
      handleClose={handleOpenOrClose}
      sx={{
        width: lgUp ? "20%" : "50%",
      }}
      dialogAction={dialogActions}
    >
      <Typography
        sx={{
          paddingLeft: '10px',
          fontSize: "14px",
          fontFamily: "var(--font-Poppins-Regular)",
        }}
      >
        Are you want to delete this city?
      </Typography>
    </Dialog>
  );
};

export default DeleteCity;
