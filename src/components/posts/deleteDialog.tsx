import { FC } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deletePost, deletePostThunk } from "@/redux/slices/post";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  postId: number;
  setPostId: (postId: number) => void;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (openDeleteDialog: boolean) => void;
}

export const DeleteDialog: FC<Props> = ({
  postId,
  setPostId,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const { isLoading } = useAppSelector((state) => state.post); //my State
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleRemovePost = async (id: number) => {
    try {
      await dispatch(deletePostThunk(id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Error deleting post");
    }
    handleCloseDeleteDialog();
  };

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this post with ID: ${postId}?`}
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
            onClick={() => handleRemovePost(postId)}
            color="error"
            disabled={isLoading}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
