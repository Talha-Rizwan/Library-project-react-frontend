import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

import { MODAL_STYLE } from "../../styles";
import { getAccessToken, isTokenVaild } from "../../utils/authUtils";
import { URL } from "../../constants";

const DeleteModal = ({ id, setReRender }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete?
          </Typography>
          <Button
            size="small"
            color="warning"
            onClick={() => {
              if (isTokenVaild()) {
                const headers = {
                  Authorization: `Bearer ${getAccessToken()}`,
                };

                axios
                  .delete(`${URL}/api/home/book-view-set/${id}/`, {
                    headers: headers,
                  })
                  .then((response) => {
                    console.log("delete successful: ", response.data);
                    setReRender((prev) => !prev);
                  })
                  .catch((error) => {
                    console.error("Error deleting: ", error);
                  });
              }
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button size="small" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.number.isRequired,
  setReRender: PropTypes.func.isRequired,
};

export default DeleteModal;
