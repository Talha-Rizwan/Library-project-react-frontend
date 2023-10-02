import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import TicketCard from "./TicketCard";
import { CustomStack } from "../../emotionStyle";

const TicketList = ({ tickets, setRerender }) => (
  <CustomStack
    useFlexGap
    spacing={{ xs: 1, sm: 2, md: 4 }}
    flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
    justifyContent="center"
    alignItems="center"
  >
    {tickets?.map((ticket) => (
      <TicketCard key={ticket?.id} ticket={ticket} setRerender={setRerender} />
    ))}
    {!tickets?.length && (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AcUnitIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="No tickets to show" />
      </ListItem>
    )}
  </CustomStack>
);

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string,
      request_user: PropTypes.string,
    })
  ),
  setRerender: PropTypes.func.isRequired,
};

export default TicketList;
