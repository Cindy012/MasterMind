import './modal.scss';

// Source: https://reactjsexample.com/video-tutorial-make-a-modal-in-reactjs/

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    title: string;
    playAgain?: () => void
}

const Modal:React.FC<ModalProps> = ({ title, setShowModal, show, hideCloseButton, playAgain }) => {
    return (
        <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal__content">
                {
                    !hideCloseButton && <span onClick={() => setShowModal(false)} className="modal__close">
                        &times;
                    </span>
                }
                <h2>{ title }</h2>
                <p style={{ textAlign: 'justify' }}>
                    You did not give the code colors.
                </p>
                {playAgain ? (
                    <button onClick={() => setShowModal(false)}>
                        Play again!
                    </button>
                ) : null }
                <button onClick={() => setShowModal(false)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
