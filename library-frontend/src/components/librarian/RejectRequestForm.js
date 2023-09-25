import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { isTokenVaild, getAccessToken } from "../../utils/authUtils";
import { URL } from "../../constants";

const defaultTheme = createTheme();

const RejectRequestForm = ({ object, closeModal, setReRender }) => {
  const [formErrors, setFormErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get("reason") === "") {
        setFormErrors("required fields cannot be empty");
      } else {
        if (isTokenVaild()) {
          const headers = {
            Authorization: `Bearer ${getAccessToken()}`,
          };
          const response = await axios.put(
            `${URL}/api/home/librarian-ticket/${object.id}/`,
            {
              reason: data.get("reason"),
              status: "R",
            },
            {
              headers: headers,
            }
          );
          console.log("Response data:", response.data);
          console.log("Request Rejected!");
        }

        setReRender((prev) => !prev);
        closeModal();
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
                  id="reason"
                  label="Reason"
                  name="reason"
                  autoComplete="reason"
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
              Reject Request
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

RejectRequestForm.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
  setReRender: PropTypes.func.isRequired,
};

export default RejectRequestForm;
