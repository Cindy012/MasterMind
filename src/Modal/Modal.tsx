import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    title: string | undefined;
    resetGame?: () => void
    gameStatus?: number;
    gameInfo?: JSX.Element;
}

const Modal:React.FC<ModalProps> = ({ title, setShowModal, show, hideCloseButton, resetGame, gameStatus, gameInfo }) => {
    const [playConfetti, setPlayConfetti] = useState(false);
    const playAgain = () => {
        if (resetGame) {
            setPlayConfetti(false);
            resetGame();
            setShowModal(false);
        }
    };

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

    if (gameStatus === 1 && resetGame && !playConfetti) {
        setPlayConfetti(true);
    }

    useEffect(() => {
        if (playConfetti) {
            confetti({
                particleCount: 160,
                spread: 100,
                colors: ['#e43b3b', '#e48a3b', '#e4de3b', '#3be45d', '#3be4de', '#3b60e4', '#8d3be4', '#e43b9b']
            });
        }
    },[playConfetti]);
       
    return (
        <div className={`modal ${show ? 'active' : ''}`}>
            <div className={ gameInfo ? 'modal__content' : 'modal__content modal__content__small' }>
                { !hideCloseButton && <span onClick={() => setShowModal(false)} className="modal__close">&times;</span> }
                <h2>{ title ? title : 'Something went wrong' }</h2> 
                <p>{ renderSwitch(gameStatus) }</p>
                { gameInfo && gameInfo }
                <div className={ gameStatus !== 0 && !gameInfo ? 'modal__footer' : 'modal__footer__secondary'}>
                    { gameStatus !== 0 && !gameInfo ? (
                        <button className="modal__button" onClick={ () => playAgain() }>Play again!</button>
                    ) : null }
                    <button className="modal__button" onClick={ () => setShowModal(false) }>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
