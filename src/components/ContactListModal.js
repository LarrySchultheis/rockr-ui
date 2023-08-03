// import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ContactList from './ContactList';

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

export default function ContactListModal({
  user,
  open,
  handleClose,
}) {
  const handleCloseModal = () => handleClose();

  return (
    <div>
      <Modal
        open={open}
      >
        <Box sx={style}>
          <ContactList user={user} closeModal={handleCloseModal}/>
        </Box>
      </Modal>
    </div>
  );
}