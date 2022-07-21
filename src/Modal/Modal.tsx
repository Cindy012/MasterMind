import '../scss/modal.scss';
import confetti from 'canvas-confetti';

// Source: https://reactjsexample.com/video-tutorial-make-a-modal-in-reactjs/

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    title: string;
    resetGame?: () => void
    gameStatus?: number;
    content?: JSX.Element;
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

    if (gameStatus === 1 && resetGame) {
        confetti({
            particleCount: 160,
            spread: 100,
            colors: ['#e43b3b', '#e48a3b', '#e4de3b', '#3be45d', '#3be4de', '#3b60e4', '#8d3be4', '#e43b9b']
        });
    };
    
    return (
        <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal__content">
                { !hideCloseButton && <span onClick={() => setShowModal(false)} className="modal__close">&times;</span> }
                <h2>{ title }</h2>
                <p style={{ textAlign: 'justify' }}>{ renderSwitch(gameStatus) }</p>
                {content ? content : null}
                <div className="modal__footer">
                    { gameStatus !== 0 && !content? (
                        <button className="modal__button" onClick={() => playAgain()}>Play again!</button>
                    ) : null }
                    <button className="modal__button" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
