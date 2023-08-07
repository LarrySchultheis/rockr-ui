import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BandInviteList from './BandInviteList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BandInviteListModal(props) {
  const {user, axiosInstance, open, handleClose} = props;
  const handleCloseModal = () => handleClose();

  return (
    <div>
      <Modal
        open={open}
      >
        <Box sx={style}>
          <BandInviteList user={user}
            closeModal={handleCloseModal}
            axiosInstance={axiosInstance}
          />
        </Box>
      </Modal>
    </div>
  );
}