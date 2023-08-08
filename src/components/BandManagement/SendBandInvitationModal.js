import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SendBandInvitationList from './SendBandInvitationList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

export default function SendBandInvitationModal(props) {
  const {user, axiosInstance, open, handleClose} = props;
  const handleCloseModal = () => handleClose();

  return (
    <div>
      <Modal
        open={open}
      >
        <Box sx={style}>
          <SendBandInvitationList user={user}
            closeModal={handleCloseModal}
            axiosInstance={axiosInstance}
          />
        </Box>
      </Modal>
    </div>
  );
}