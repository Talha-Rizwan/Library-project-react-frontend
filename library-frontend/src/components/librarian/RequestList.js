import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import RequestCard from "./RequestCard";
import { CustomStack } from "../../emotionStyle";

const RequestList = ({ requests, setRerender }) => (
  <CustomStack
    useFlexGap
    spacing={{ xs: 1, sm: 2, md: 4 }}
    flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
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
  </CustomStack>
);

RequestList.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      requested_book: PropTypes.string,
      request_user: PropTypes.string,
      created: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  setRerender: PropTypes.func.isRequired,
};

export default RequestList;
