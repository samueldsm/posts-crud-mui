import { FC, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { IPost } from "@/interfaces";
import { validateTrim } from "@/util/validation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPostThunk, updatePostThunk } from "@/redux/slices/post";

interface Props {
  isUpdate: boolean;
  openForm: boolean;
  editPost: IPost;
  setEditPost: (value: IPost) => void;
  setIsUpdate: (value: boolean) => void;
  setOpenForm: (openForm: boolean) => void;
}

export const FormDialog: FC<Props> = ({
  editPost,
  openForm,
  isUpdate,
  setEditPost,
  setOpenForm,
  setIsUpdate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { isLoading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    editPost.title && setTitle(editPost.title);
    editPost.body && setBody(editPost.body);
  }, [editPost]);

  // Validation not only whitespace
  const validateInput = (value: string) => validateTrim(value);

  const handleClose = () => {
    setOpenForm(false);
    setBody("");
    setTitle("");
    setEditPost({ userId: -1, title: "", body: "", id: -1 });
    reset();
    setIsUpdate(false);
  };

  const handleAddPost = async () => {
    if (!title && !body) return;

    const newPost = {
      id: Date.now(), //Only for test
      body,
      title,
      userId: 1, //Always "1" only for test
    };

    try {
      await dispatch(addPostThunk(newPost));
      toast.success("The post was created successfully");
    } catch (error) {
      toast.error("Error during insert");
    }
    handleClose();
  };

  const handleEditPost = async () => {
    if (!title && !body) return;

    const editedPost = {
      id: editPost.id,
      body: body,
      title: title,
      userId: editPost.userId,
    } as IPost;

    try {
      await dispatch(updatePostThunk(editedPost));
      toast.success("The post was successfully updated");
    } catch (error) {
      toast.error("Error during update");
    }
    handleClose();
  };

  return (
    <Dialog open={openForm} onClose={() => handleClose()}>
      <form onSubmit={handleSubmit(isUpdate ? handleEditPost : handleAddPost)}>
        <DialogTitle>{isUpdate ? "Edit Post" : "Add a new post"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* TODO: Repair errors messages dimensions*/}
        <DialogContent dividers>
          <TextField
            id="title"
            type="text"
            label="Title"
            value={title}
            margin="dense"
            variant="outlined"
            maxLength={250}
            minLength={1}
            autoFocus
            fullWidth
            placeholder="Enter a title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 250,
                message: "The title cannot be longer than 250 characters.",
              },
              minLength: {
                value: 1,
                message: "The title cannot be less than 1 character.",
              },
              validate: validateInput,
              onChange: (e) => setTitle(e.target.value),
            })}
          />
          {errors.title && typeof errors.title?.message === "string" && (
            <Typography className="errorMessage">
              {errors.title.message}
            </Typography>
          )}
          <TextField
            id="body"
            type="text"
            rows={4}
            label="Body"
            value={body}
            margin="dense"
            variant="outlined"
            multiline
            fullWidth
            {...register("body", {
              required: "Description is required",
              validate: validateInput,
              onChange: (e) => setBody(e.target.value),
            })}
          />
          {errors.body && typeof errors.body?.message === "string" && (
            <Typography className="errorMessage">
              {errors.body.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="inherit">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} color="primary">
            {isUpdate ? "Edit Post" : "Add Post"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
