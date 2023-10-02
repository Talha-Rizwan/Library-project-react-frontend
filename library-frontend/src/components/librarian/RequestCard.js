import React from "react";
import PropTypes from "prop-types";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { REQUEST_STATUS, URL } from "../../constants";
import { isTokenVaild, getAccessToken } from "../../utils/authUtils";
import { CustomWideCard } from "../../emotionStyle";

const RequestCard = ({ request, setRerender }) => {
  const handleApproveRequest = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        status: REQUEST_STATUS.APPROVED_STATUS,
      };

      axios
        .put(`${URL}/api/home/request/${request?.id}/`, requestBody, {
          headers: headers,
        })
        .then((response) => {
          console.log("Request update successful: ", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error updating status: ", error);
        });
    }
  };

  const handleRejectRequest = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        status: REQUEST_STATUS.REJECTED_STATUS,
      };

      axios
        .put(`${URL}/api/home/request/${request?.id}/`, requestBody, {
          headers: headers,
        })
        .then((response) => {
          console.log("Request update successful: ", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error updating status: ", error);
        });
    }
  };

  const handleCloseRequest = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        status: REQUEST_STATUS.CLOSED_STATUS,
      };

      axios
        .put(`${URL}/api/home/close-request/${request?.id}/`, requestBody, {
          headers: headers,
        })
        .then((response) => {
          console.log("Request update successful: ", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error updating status: ", error);
        });
    }
  };

  return (
    <CustomWideCard minWidth="275">
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Request id: {request?.id}
        </Typography>
        <Typography variant="h5" component="div">
          Book Name : {request?.requested_book}
        </Typography>
        <Typography>User : {request?.request_user}</Typography>
        <Typography variant="body2">
          Date : {request?.created.slice(0, 10)}
          <br />
        </Typography>
        <Typography>Status : {request?.status}</Typography>
      </CardContent>
      {request?.status === REQUEST_STATUS.PENDING_STATUS && (
        <CardActions>
          <Button size="small" onClick={handleApproveRequest}>
            Approve
          </Button>
          <Button size="small" onClick={handleRejectRequest}>
            Reject
          </Button>
        </CardActions>
      )}
      {request?.status === REQUEST_STATUS.RETURN_REQUEST_STATUS && (
        <CardActions>
          <Button size="small" onClick={handleCloseRequest}>
            Close
          </Button>
        </CardActions>
      )}
    </CustomWideCard>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.number.isRequired,
    requested_book: PropTypes.string,
    request_user: PropTypes.string,
    created: PropTypes.string,
    status: PropTypes.string,
  }),
  setRerender: PropTypes.func.isRequired,
};

export default RequestCard;
