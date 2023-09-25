import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { isTokenVaild, getAccessToken } from "../../utils/authUtils";

const defaultTheme = createTheme();

const UserTicketForm = ({ closeModal }) => {
  const [formErrors, setFormErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get("book_name") === "") {
        setFormErrors("required fields cannot be empty");
      } else {
        if (isTokenVaild()) {
          const headers = {
            Authorization: `Bearer ${getAccessToken()}`,
          };
          const response = await axios.post(
            `http://127.0.0.1:8000/api/home/ticket/`,
            {
              book_name: data.get("book_name"),
              status: "P",
            },
            {
              headers: headers,
            }
          );
          console.log("Response data:", response.data);
          console.log("Ticket Created Successfully!");
        }

        closeModal();
        alert("Ticket is successfully created!");
      }
    } catch (error) {
      setFormErrors(error.response.data);
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
                  required
                  id="book_name"
                  label="Book Name"
                  name="book_name"
                  autoComplete="book_name"
                />
              </Grid>
            </Grid>
            {formErrors && <p sx={{ color: "red" }}>{formErrors}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Request
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UserTicketForm;
