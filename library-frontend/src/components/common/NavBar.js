import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

import FormModal from "./Modal";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  LIBRARIAN_ROLE,
  USER_TICKET,
} from "../../constants";
import { StyledNavButton, StyledTypography } from "../../styles";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    if (url) {
      navigate(url);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (url) => {
    if (url) {
      if (url === "/login/") {
        localStorage.setItem(ACCESS_TOKEN, null);
        localStorage.setItem(REFRESH_TOKEN, null);
        localStorage.setItem(LIBRARIAN_ROLE, null);
      }
      navigate(url);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledTypography
            variant="h6"
            noWrap
            component="a"
            href="/"
            isXs={false}
          >
            Library
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {localStorage.getItem(LIBRARIAN_ROLE) === "true" && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => handleCloseNavMenu("/librarian/")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleCloseNavMenu("/librarian/requests/")}
                >
                  <Typography textAlign="center">Requests</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleCloseNavMenu("/librarian/books/")}
                >
                  <Typography textAlign="center">Books</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleCloseNavMenu("/librarian/tickets/")}
                >
                  <Typography textAlign="center">Tickets</Typography>
                </MenuItem>
              </Menu>
            )}
            {localStorage.getItem(LIBRARIAN_ROLE) === "false" && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => handleCloseNavMenu("/")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseNavMenu("/mybooks/")}>
                  <Typography textAlign="center">My Books</Typography>
                </MenuItem>
                <MenuItem>
                  <FormModal name={USER_TICKET} />
                </MenuItem>
              </Menu>
            )}
          </Box>
          <StyledTypography
            variant="h5"
            noWrap
            component="a"
            href="/"
            isXs={true}
          >
            Library
          </StyledTypography>
          {localStorage.getItem(LIBRARIAN_ROLE) === "true" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <StyledNavButton
                onClick={() => handleCloseNavMenu("/librarian/")}
              >
                Home
              </StyledNavButton>
              <StyledNavButton
                onClick={() => handleCloseNavMenu("/librarian/requests")}
              >
                Requests
              </StyledNavButton>
              <StyledNavButton
                onClick={() => handleCloseNavMenu("/librarian/books/")}
              >
                Books
              </StyledNavButton>
              <StyledNavButton
                onClick={() => handleCloseNavMenu("/librarian/tickets/")}
              >
                Tickets
              </StyledNavButton>
            </Box>
          )}
          {localStorage.getItem(LIBRARIAN_ROLE) === "false" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <StyledNavButton onClick={() => handleCloseNavMenu("/")}>
                Home
              </StyledNavButton>
              <StyledNavButton onClick={() => handleCloseNavMenu("/mybooks/")}>
                My Books
              </StyledNavButton>
              <StyledNavButton>
                <FormModal name={USER_TICKET} />
              </StyledNavButton>
            </Box>
          )}

          {localStorage.getItem(LIBRARIAN_ROLE) !== null && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                <MenuItem onClick={() => handleCloseUserMenu("/update/")}>
                  <Typography textAlign="center">Update Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu("/login/")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
