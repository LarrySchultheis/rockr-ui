import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BandInvitation from './BandInvitation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BandInvitationModal({
  user,
  invitations,
  showModal,
  closeModal
}) {
  const handleCloseModal = () => closeModal();

  return (
    <div>
      <Modal
        open={showModal}
      >
        <Box sx={style}>
          <BandInvitation
            user={user}
            invitations={invitations}
            closeModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </div>
  );
}