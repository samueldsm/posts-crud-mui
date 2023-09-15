import { FC } from "react";

import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

interface Props {
  setOpenForm: (value: boolean) => void;
}
export const AddButton: FC<Props> = ({ setOpenForm }) => {
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <Button
      variant="outlined"
      color="success"
      sx={{ height: "100%" }}
      startIcon={<AddCircleOutlineOutlinedIcon />}
      onClick={() => handleClickOpenForm()}
    >
      New
    </Button>
  );
};
