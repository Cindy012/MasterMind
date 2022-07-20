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
    // const message = [
    //     'hi',
    //     'bye'
    // ];

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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maxime dolorem asperiores laboriosam ad delectus ea. Tempora tempore repellendus laudantium fugiat saepe mollitia eius illo possimus laborum consequuntur, tenetur neque.
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
