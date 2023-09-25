import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { APPROVE_TICKET, REJECT_TICKET, TICKET_STATUS } from "../../constants";
import FormModal from "../common/Modal";

const TicketCard = ({ ticket, setRerender }) => (
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

TicketCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string,
    request_user: PropTypes.string,
  }),
  setRerender: PropTypes.func.isRequired,
};

export default TicketCard;
