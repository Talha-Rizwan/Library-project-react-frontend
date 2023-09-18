import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";

const Header = ({setSearchValue}) => {
  return (
    <Box sx={{ flexGrow: 1, margin: "20px" }}>
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
            LIBRARY SYSTEM
          </Typography>
          <SearchBar setSearchValue={setSearchValue}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
