import { FC } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface Props {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (openDeleteDialog: boolean) => void;
}

export const DeleteDialog: FC<Props> = ({
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete it, you won't be able to get it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleCloseDeleteDialog()}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => handleCloseDeleteDialog()}
            color="error"
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
