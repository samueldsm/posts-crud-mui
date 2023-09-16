import { FC, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPost, updatePost } from "@/redux/slices/post";
import { IPost } from "@/interfaces";

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

  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    editPost.title && setTitle(editPost.title);
    editPost.body && setBody(editPost.body);
  }, [editPost]);

  const handleClose = () => {
    setBody("");
    setTitle("");
    setOpenForm(false);
    setIsUpdate(false);
    setEditPost({ userId: -1, title: "", body: "", id: -1 });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = { title, body };
    console.log(formData);
    // const formData = {
    //     title,
    // };

    // await dispatch(createTask(formData)).then(() => {
    //     dispatch(readTasks());
    //     setTitle('');
    // });
  };

  const handleAddPost = (e: any) => {
    e.preventDefault();
    if (!title && !body) return;

    const newPost = {
      id: Date.now(), //Only for test
      body,
      title,
      userId: 1, //Always "1" only for test
    };

    dispatch(addPost(newPost));

    // Reset form fields
    setTitle("");
    setBody("");
    handleClose();
  };
  const handleEditPost = (e: any) => {
    e.preventDefault();
    console.log(e);
    if (!title && !body) return;

    const editedPost = {
      id: editPost.id,
      body: body,
      title: title,
      userId: editPost.userId,
    } as IPost;

    dispatch(updatePost(editedPost));
    // Reset form fields
    setTitle("");
    setBody("");
    handleClose();
  };
  return (
    <div>
      <form onSubmit={isUpdate ? handleEditPost : handleAddPost}>
        <Dialog open={openForm} onClose={() => handleClose()}>
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
          {/* TODO: finish this design  */}
          <DialogContent dividers>
            <TextField
              id="title"
              type="text"
              label="Title"
              value={title}
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              autoFocus={true}
            />
            <TextField
              id="body"
              type="text"
              label="Body"
              value={body}
              margin="dense"
              variant="outlined"
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              onClick={isUpdate ? handleEditPost : handleAddPost}
            >
              {isUpdate ? "Edit Post" : "Add Post"}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};
