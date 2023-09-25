import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SearchBar from "./SearchBar";

const Header = ({ setSearchValue }) => (
  <Box sx={{ flexGrow: 1, margin: "50px" }}>
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
            color: "black",
          }}
        >
          Books
        </Typography>
        <SearchBar setSearchValue={setSearchValue} />
      </Toolbar>
    </AppBar>
  </Box>
);

Header.propTypes = {
  setSearchValue: PropTypes.func,
};

export default Header;
