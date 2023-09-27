import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN, REFRESH_TOKEN, LIBRARIAN_ROLE, URL } from "../constants";
import { isTokenVaild } from "../utils/authUtils";
import { FormStyles } from "../emotionStyle";

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");

  useEffect(() => {
    if (isTokenVaild() === true) {
      navigate("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get("username") && data.get("password")) {
        const response = await axios.post(`${URL}/api/user/login/`, {
          username: data.get("username"),
          password: data.get("password"),
        });

        setFormErrors(response.data.message);

        if (response.data.message === "login success") {
          localStorage.setItem(ACCESS_TOKEN, response.data.token.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.token.refresh);
          localStorage.setItem(LIBRARIAN_ROLE, response.data.librarian);
          if (response.data.librarian) {
            navigate("/librarian/");
          } else {
            navigate("/");
          }
        }
      } else {
        setFormErrors("Please fill required fields!");
      }
    } catch (formErrors) {
      alert(formErrors.response.data.username[0]);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormStyles>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {formErrors && <p>{formErrors}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormStyles>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
