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

const AddForm = ({ closeModal, setReRender }) => {
  const [formErrors, setFormErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (
        data.get("name") === "" ||
        data.get("author_name") === "" ||
        data.get("publisher_name") === "" ||
        data.get("number_of_books") === ""
      ) {
        setFormErrors("required fields cannot be empty");
      } else {
        if (isTokenVaild()) {
          const headers = {
            Authorization: `Bearer ${getAccessToken()}`,
          };
          const response = await axios.post(
            `http://127.0.0.1:8000/api/home/book-view-set/`,
            {
              name: data.get("name"),
              author_name: data.get("author_name"),
              publisher_name: data.get("publisher_name"),
              number_of_books: data.get("number_of_books"),
            },
            {
              headers: headers,
            }
          );

          console.log("Response data:", response.data);
          console.log("New Book Created!");
          setReRender((prev) => !prev);
          closeModal();
        }
      }
    } catch (error) {
      setFormErrors(error.response.data.username);
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
                  id="name"
                  label="Book Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author_name"
                  label="Author Name"
                  name="author_name"
                  autoComplete="author_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="publisher_name"
                  label="Publisher"
                  id="publisher_name"
                  autoComplete="publisher_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="number_of_books"
                  label="Number of Copies"
                  name="number_of_books"
                  autoComplete="number_of_books"
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
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default AddForm;
