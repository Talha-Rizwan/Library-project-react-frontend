import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

import AddForm from './AddForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ setReRender }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
          >
      <Button onClick={handleOpen} variant="contained" color='success' sx={{margin:"20px"}}>Add Book</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <AddForm closeModal={handleClose} setReRender={setReRender}/>
          </Typography>
          <Button
          size="small"
          color="primary"
          onClick={handleClose}
          >Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
