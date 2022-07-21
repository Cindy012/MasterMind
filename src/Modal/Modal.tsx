import '../scss/modal.scss';

// Source: https://reactjsexample.com/video-tutorial-make-a-modal-in-reactjs/

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    title: string;
    resetGame?: () => void
    gameStatus?: number;
    content?: string;
}

const Modal:React.FC<ModalProps> = ({ title, setShowModal, show, hideCloseButton, resetGame, gameStatus, content }) => {
    const playAgain = () => {
        if (resetGame) {
            resetGame();
            setShowModal(false);
        }
    } 

    const renderSwitch = (state: number | undefined) => {
        if (state !== undefined) {
            switch(state) {
                case 1:
                    return 'You win, play again!';
                case 2:
                    return 'You lose, next time better!';
                default:
                    return 'You did not give the code colors.';
            }
        }
    };

    return (
        <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal__content">
                { !hideCloseButton && <span onClick={() => setShowModal(false)} className="modal__close">&times;</span> }
                <h2>{ title }</h2>
                <p style={{ textAlign: 'justify' }}>{ renderSwitch(gameStatus) }</p>
                {content ? content : null}
                <div className="modal__footer">
                    { gameStatus !== 0 ? (
                        <button className="modal__button" onClick={() => playAgain()}>Play again!</button>
                    ) : null }
                    <button className="modal__button" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
