import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import { isTokenVaild, getAccessToken } from "../utils/authUtils";

const defaultTheme = createTheme();

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [formErrors, setFormErrors] = useState("");

  useEffect(() => {
    if (isTokenVaild() === false) {
      navigate("/login/");
    }
  }, []);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      if (data.get("fullname") === "" && data.get("phone") === "") {
        setFormErrors("Fill the fields");
      } else {
        if (isTokenVaild()) {
          const headers = {
            Authorization: `Bearer ${getAccessToken()}`,
          };
          const response = await axios.put(
            "http://127.0.0.1:8000/api/user/user-profile/",
            {
              full_name: data.get("fullname"),
              phone: data.get("phone"),
              gender: gender,
            },
            {
              headers: headers,
            }
          );

          console.log("Response data:", response.data);
          alert("Profile updated successfully!");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update User Profile
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
                  id="username"
                  label="Username cannot be updated"
                  name="username"
                  autoComplete="username"
                  disabled={true}
                />
              </Grid>
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
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={gender}
                  onChange={handleChange}
                  label="Gender"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                  <MenuItem value={"O"}>Other</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {formErrors && <p sx={{ color: "red" }}>{formErrors}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UpdateProfile;
