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
import { ADD_BOOK, UPDATE_BOOK, APPROVE_TICKET, URL } from "../../constants";

const defaultTheme = createTheme();

const Form = ({ object, closeModal, setReRender, name }) => {
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
          if (name === ADD_BOOK) {
            const response = await axios.post(
              `${URL}/api/home/book-view-set/`,
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
            console.log("New Book Successfully Added!");
          } else if (name === UPDATE_BOOK) {
            const response = await axios.put(
              `${URL}/api/home/book-view-set/${object.id}/`,
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
            console.log("Updated Book Information!");
          } else if (name === APPROVE_TICKET) {
            const response = await axios.put(
              `${URL}/api/home/librarian-ticket/${object.id}/`,
              {
                status: "A",
                book_name: data.get("name"),
                author_name: data.get("author_name"),
                publisher: data.get("publisher_name"),
                number_of_copies: data.get("number_of_books"),
              },
              {
                headers: headers,
              }
            );
            console.log("Response data:", response.data);
            console.log("Updated Book Information!");
          }

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
                  defaultValue={object?.name}
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
                  defaultValue={object?.author_name}
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
                  defaultValue={object?.publisher_name}
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
                  defaultValue={object?.number_of_books}
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
              {name}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Form;
