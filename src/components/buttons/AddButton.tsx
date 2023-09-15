import Button from "@mui/material/Button";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const AddButton = () => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{ height: "100%" }}
      startIcon={<AddCircleOutlineOutlinedIcon />}
    >
      New
    </Button>
  );
};
