import React, { type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

function AddLocationModal({ open, setOpen, children }: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="lg"
      className="m-0 p-0 max-h-96"
    >
      <DialogTitle textAlign="center">Select location from map</DialogTitle>
      <DialogContent className="flex justify-center">{children}</DialogContent>
    </Dialog>
  );
}

export default AddLocationModal;
