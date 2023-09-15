import { FC, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MinHeightTextarea from "../ui/Textarea";

interface Props {
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
}

export const FormDialog: FC<Props> = ({ openForm, setOpenForm }) => {
  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Add a new post</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* TODO: finish this design  */}
        <DialogContent dividers>
          <TextField
            id="title"
            type="text"
            label="Title"
            margin="dense"
            variant="outlined"
            autoFocus
            fullWidth
          />
          <MinHeightTextarea />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
