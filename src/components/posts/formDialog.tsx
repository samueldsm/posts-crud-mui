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
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleClose = () => {
    setOpenForm(false);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="body"
              type="text"
              label="Body"
              margin="dense"
              variant="outlined"
              fullWidth
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {/* <MinHeightTextarea body={body} setBody={setBody} /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};
