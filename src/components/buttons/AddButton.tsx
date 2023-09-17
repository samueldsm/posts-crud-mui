import { FC } from "react";

import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useAppSelector } from "@/redux/hooks";

interface Props {
  setOpenForm: (value: boolean) => void;
}
export const AddButton: FC<Props> = ({ setOpenForm }) => {
  const { isLoading } = useAppSelector((state) => state.post);

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
      disabled={isLoading}
    >
      New
    </Button>
  );
};
