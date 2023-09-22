import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

import { MODAL_STYLE } from "../../constants";
import Form from "./Form";

const FormModal = ({ book, setReRender, name }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center">
        <Button onClick={handleOpen}>{name}</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Form
              book={book}
              closeModal={handleClose}
              setReRender={setReRender}
              name={name}
            />
          </Typography>
          <Button size="small" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
