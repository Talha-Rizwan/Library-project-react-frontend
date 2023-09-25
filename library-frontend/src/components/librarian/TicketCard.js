import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { APPROVE_TICKET, REJECT_TICKET, TICKET_STATUS } from "../../constants";
import { isTokenVaild, getAccessToken } from "../../utils/authUtils";
import FormModal from "./Modal";

const TicketCard = ({ ticket, setRerender }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ticket id: {ticket?.id}
        </Typography>
        <Typography variant="h5" component="div">
          Ticket status : {ticket?.status}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          User : {ticket?.request_user}
        </Typography>
      </CardContent>
      {ticket?.status === TICKET_STATUS.PENDING_STATUS && (
        <CardActions>
          {/* <Button
          size="small"
          onClick={() => {
            if (isTokenVaild()) {
              const headers = {
                Authorization: `Bearer ${getAccessToken()}`,
              };
              const requestBody = {
                status: "R",
                reason: "not good"
              };

              axios
                .put(
                  `http://127.0.0.1:8000/api/home/librarian-ticket/${ticket?.id}/`,
                  requestBody,
                  {
                    headers: headers,
                  }
                )
                .then((response) => {
                  console.log("Ticket rejection successful: ", response.data);
                  setRerender((prev) => !prev);
                })
                .catch((error) => {
                  console.error("Error updating status: ", error);
                });
            }
          }}
        >
          Reject
        </Button> */}
          <FormModal
            setReRender={setRerender}
            name={APPROVE_TICKET}
            object={ticket}
          />
          <FormModal
            setReRender={setRerender}
            name={REJECT_TICKET}
            object={ticket}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default TicketCard;
