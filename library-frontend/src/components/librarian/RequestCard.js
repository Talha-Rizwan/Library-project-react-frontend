import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { isTokenVaild, getAccessToken } from "../../utils/authUtils";

const RequestCard = ({ request, setRerender }) => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Request id: {request?.id}
      </Typography>
      <Typography variant="h5" component="div">
        Book Name : {request?.requested_book}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        User : {request?.request_user}
      </Typography>
      <Typography variant="body2">
        Date : {request?.created.slice(0, 10)}
        <br />
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Status : {request?.status}
      </Typography>
    </CardContent>
    {request?.status === "P" && (
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            if (isTokenVaild()) {
              const headers = {
                Authorization: `Bearer ${getAccessToken()}`,
              };
              const requestBody = {
                status: "A",
              };

              axios
                .put(
                  `http://127.0.0.1:8000/api/home/request/${request?.id}/`,
                  requestBody,
                  {
                    headers: headers,
                  }
                )
                .then((response) => {
                  console.log("Request update successful: ", response.data);
                  setRerender((prev) => !prev);
                })
                .catch((error) => {
                  console.error("Error updating status: ", error);
                });
            }
          }}
        >
          Approve
        </Button>
        <Button
          size="small"
          onClick={() => {
            if (isTokenVaild()) {
              const headers = {
                Authorization: `Bearer ${getAccessToken()}`,
              };
              const requestBody = {
                status: "R",
              };

              axios
                .put(
                  `http://127.0.0.1:8000/api/home/request/${request?.id}/`,
                  requestBody,
                  {
                    headers: headers,
                  }
                )
                .then((response) => {
                  console.log("Request update successful: ", response.data);
                  setRerender((prev) => !prev);
                })
                .catch((error) => {
                  console.error("Error updating status: ", error);
                });
            }
          }}
        >
          Reject
        </Button>
      </CardActions>
    )}
    {request?.status === "B" && (
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            if (isTokenVaild()) {
              const headers = {
                Authorization: `Bearer ${getAccessToken()}`,
              };
              const requestBody = {
                status: "C",
              };

              axios
                .put(
                  `http://127.0.0.1:8000/api/home/close-request/${request?.id}/`,
                  requestBody,
                  {
                    headers: headers,
                  }
                )
                .then((response) => {
                  console.log("Request update successful: ", response.data);
                  setRerender((prev) => !prev);
                })
                .catch((error) => {
                  console.error("Error updating status: ", error);
                });
            }
          }}
        >
          Close
        </Button>
      </CardActions>
    )}
  </Card>
);

export default RequestCard;
