import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { isTokenVaild } from "../utils/authUtils";
import { URL } from "../constants";
import { FormStyles } from "../emotionStyle";

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVaild() === true) {
      navigate("/");
    }
  });

  const [formErrors, setFormErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get("password") === "" || data.get("username") === "") {
        setFormErrors("Fill the required fields");
      } else {
        const response = await axios.post(`${URL}/api/user/user-profile/`, {
          password: data.get("password"),
          username: data.get("username"),
          full_name: data.get("fullname"),
          phone: data.get("phone"),
        });

        console.log("Response data:", response.data);
        alert("Account successfully created!");
        navigate("/login");
      }
    } catch (error) {
      setFormErrors(error.response.data.username);
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
            Sign up for User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
            </Grid>
            {formErrors && <p>{formErrors}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormStyles>
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
