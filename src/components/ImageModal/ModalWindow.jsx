import ReactModal from 'react-modal';
import css from './Modal.module.css';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent',
  },
};

export default function ModalWindow({
  modal: { photoUrl, alt_description },
  isOpen,
  closeModal,
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.modal}>
        <img src={photoUrl} alt={alt_description} className={css.modalImg} />
      </div>
    </ReactModal>
  );
}