import TextField from "@mui/material/TextField";

export const SearchInput = () => {
  return (
    <TextField
      sx={{ width: "100%", height: "10%" }}
      id="outlined-basic"
      type="search"
      label="Search"
      variant="outlined"
    />
  );
};
