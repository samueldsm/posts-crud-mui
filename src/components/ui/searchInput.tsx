import { ChangeEvent, FC, useState } from "react";

import TextField from "@mui/material/TextField";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchInput: FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <TextField
      sx={{ width: "100%", height: "10%" }}
      id="searchInput"
      type="search"
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
