import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

import { REJECT_TICKET, USER_TICKET } from "../../constants";
import Form from "../librarian/Form";
import RejectRequestForm from "../librarian/RejectRequestForm";
import UserTicketForm from "../user/UserTicketForm";
import { MODAL_STYLE } from "../../emotionStyle";

const FormModal = ({ object, setReRender, name }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center">
        <Button
          onClick={handleOpen}
          style={{ color: name === USER_TICKET ? "white" : "inherit" }}
        >
          {name}
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name === REJECT_TICKET ? (
              <RejectRequestForm
                object={object}
                closeModal={handleClose}
                setReRender={setReRender}
                name={name}
              />
            ) : name === USER_TICKET ? (
              <UserTicketForm closeModal={handleClose} />
            ) : (
              <Form
                object={object}
                closeModal={handleClose}
                setReRender={setReRender}
                name={name}
              />
            )}
          </Typography>
          <Button size="small" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

FormModal.propTypes = {
  object: PropTypes.object,
  setReRender: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default FormModal;
