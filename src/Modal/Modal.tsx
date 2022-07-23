import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    resetGame?: () => void
    gameStatus: number; // 0: gameInfo, 1: not filled/ongoing, 2: winner, 3: loser
    gameInfo?: JSX.Element;
}

const Modal:React.FC<ModalProps> = ({ setShowModal, show, hideCloseButton, resetGame, gameStatus, gameInfo }) => {
    const [playConfetti, setPlayConfetti] = useState(false);
    const playAgain = () => {
        if (resetGame) {
            setPlayConfetti(false);
            resetGame();
            setShowModal(false);
        }
    };

    const title: string[] = [
        'Mastermind game info',
        'Not Yet!',
        'Winner!',
        'Loser!'
    ];

    const text: string[] = [
        '',
        'You did not give the code colors.',
        'You win, play again!',
        'You lose, next time better!'
    ];

    if (gameStatus === 2 && resetGame && !playConfetti) {
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
                <h2>{ title[gameStatus] }</h2> 
                { gameInfo && gameStatus === 0 ? gameInfo : <p>{ text[gameStatus] }</p> }
                <div className={ gameStatus === 0 || gameStatus === 1 ? 'modal__footer__secondary' : 'modal__footer'}>
                    { gameStatus !== 1 && gameStatus !== 0 ? (
                        <button className="modal__button" onClick={ () => playAgain() }>Play again!</button>
                    ) : null }
                    <button className="modal__button" onClick={ () => setShowModal(false) }>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
