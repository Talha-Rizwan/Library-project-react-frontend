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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, LIBRARIAN_ROLE } from "../constants";

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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Library
          </Typography>

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

            {localStorage.getItem(LIBRARIAN_ROLE)==='true' && (
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
              </Menu>
            )
              }
            {localStorage.getItem(LIBRARIAN_ROLE)==='false' &&  (
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
              </Menu>
            )}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Library
          </Typography>
          {localStorage.getItem(LIBRARIAN_ROLE)==='true' && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => handleCloseNavMenu("/librarian/")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => handleCloseNavMenu("/librarian/requests")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Requests
              </Button>
              <Button
                onClick={() => handleCloseNavMenu("/librarian/books/")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Books
              </Button>
            </Box>
          ) }
          {localStorage.getItem(LIBRARIAN_ROLE)==='false' && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => handleCloseNavMenu("/")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => handleCloseNavMenu("/mybooks/")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                My Books
              </Button>
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
