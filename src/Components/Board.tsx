import { totalRows } from "../ts/Board";

interface BoardProps {
    boardView: JSX.Element[] | undefined;
    cluesBoardView: JSX.Element[] | undefined;
    colorPegOptionsView: JSX.Element[] | undefined;
	turn: number;
	checkCode: () => void;
}

const Board:React.FC<BoardProps> = ({ boardView, cluesBoardView, colorPegOptionsView, turn, checkCode }) => {
	return (
		<div className="mastermind__board-content">
			<div className="board">{ boardView }</div>
			<div className="board-clue">{ cluesBoardView }</div>
			<div className="mastermind__side">
				<h2>{ turn === totalRows ? turn : turn + 1 }</h2>
				<button className="button button__check" onClick={ () => checkCode() }>Check</button>
				<div className="color-peg-options">{ colorPegOptionsView }</div>
			</div>
		</div>
	);
};

export default Board;
