import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Stack } from "@mui/material";

import RequestCard from "./RequestCard";

const RequestList = ({ requests, setRerender }) => (
  <Stack
    useFlexGap
    flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    justifyContent="center"
    alignItems="center"
  >
    {requests?.map((request) => {
      return (
        <RequestCard
          key={request?.id}
          request={request}
          setRerender={setRerender}
        />
      );
    })}
    {!requests?.length && (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AcUnitIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="No requests to show" />
      </ListItem>
    )}
  </Stack>
);

export default RequestList;
