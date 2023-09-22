import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Stack } from "@mui/material";

import TicketCard from "./TicketCard";

const TicketList = ({ tickets, setRerender }) => {
    console.log("new tickets are : ", tickets)
  return (
    <Stack
      useFlexGap
      flexWrap="wrap"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      alignItems="center"
    >
      {tickets?.map((ticket) => {
        return (
          <TicketCard
            key={ticket?.id}
            ticket={ticket}
            setRerender={setRerender}
          />
        );
      })}
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
    </Stack>
  );
};

export default TicketList;
