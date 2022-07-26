interface GiveUpModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideCloseButton?: boolean;
    show: boolean;
    showAnswer: () => void;
    title: string;
}

const GiveUpModal:React.FC<GiveUpModalProps> = ({ setShowModal, show, hideCloseButton, showAnswer, title }) => {
    const stopGame = () => {
        showAnswer();
        setShowModal(false);
    };

    return (
        <div className={`modal ${show ? 'active' : ''}`}>
            <div className='modal__content'>
                { !hideCloseButton && <span onClick={() => setShowModal(false)} className="modal__close">&times;</span> }
                <h2>{ title }</h2> 
                <p>Are you sure to give up?</p>
                <div className="modal__footer">
                    <button className="modal__button" onClick={ () => stopGame() }>Yes</button>
                    <button className="modal__button" onClick={ () => setShowModal(false) }>No</button>
                    
                </div>
            </div>
        </div>
    );
};

export default GiveUpModal;
