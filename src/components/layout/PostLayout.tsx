import { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PostsNavbar from "../ui/PostsNavbar";

interface Props {
  icon?: JSX.Element;
  title: string;
  children: React.ReactNode;
}

export const PostLayout: FC<Props> = ({ children, title, icon }) => {
  return (
    <>
      <nav>
        <PostsNavbar />
      </nav>
      <main>
        <Box
          display="flex"
          sx={{
            mt: 10,
            paddingLeft: 4,
          }}
        >
          <Typography variant="h5" component="h1">
            {icon} {title}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
