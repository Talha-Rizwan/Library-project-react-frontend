import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import SearchBar from "./SearchBar";
import { CustomAppBar, HeaderTypography } from "../../emotionStyle";

const Header = () => (
  <Box sx={{ flexGrow: 1, margin: "50px" }}>
    <CustomAppBar position="static">
      <Toolbar>
        <HeaderTypography variant="h6" noWrap component="div">
          Books
        </HeaderTypography>
        <SearchBar />
      </Toolbar>
    </CustomAppBar>
  </Box>
);

export default Header;
