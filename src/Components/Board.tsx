import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard, initializeClueBoard } from './BoardInitializer';
import { createCode } from './Code';
import Peg from './Peg';
import Row from './Row';
import CluePeg from './CluePeg';

const Board = () => {
	let turn = 0;
	const totalRows = 12;
	const pegsInRow = 4;
	const [board, setBoard] = useState<Color[][]>(initializeBoard());
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [clueBoard, setClueBoard] = useState<Color[][]>(initializeClueBoard());
	const [clueBoardView, setClueBoardView] = useState<JSX.Element[]>();
	const [currentColor, setCurrentColor] = useState<Color>();
	const [boardBool, setBoardBool] = useState<boolean>(false);
	const [code] = useState<Color[]>(createCode()); // , setNewCode

	const selectCurrentColor = (color: Color) => setCurrentColor(color);

	function showColorPegOptions() {
		return (
			<Fragment>
				<Peg className= {Color.Red} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Orange} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Green} selectColor= {selectCurrentColor} />
				<Peg className= {Color.LightBlue} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Blue} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Purple} selectColor= {selectCurrentColor} />
			</Fragment>
		)
	};

	// This will be executed when user selected all pegs in row. Otherwise the button is inactive
	const checkCode = () => {
		let newClueBoard = clueBoard;
		code.forEach((color, index) => {
			if (color === board[turn][index]) {
				console.log('yes');
				newClueBoard[turn][index] = Color.Red;
			} else if (colorContainsInCode(board[turn][index])){ 
				// Now "could be" is even when the color of the user code exist multiple times => could give a wrong indicator to user 
				console.log('could be');
				newClueBoard[turn][index] = Color.Black;
			} else {
				console.log('no');
			}
		});
		setClueBoard(newClueBoard);
	};

	const colorContainsInCode = (pegColor: Color) => {
		let result = false;
		code.forEach(color => {
			if (color === pegColor) {
				result = true;
			}
		});
		return result;
	};

	useEffect(() => {
		console.log(currentColor);
    }, [currentColor]);

	useEffect(() => {
		const colorPeg = (rowId: number, pegId: number) => {
			if (rowId === turn && board && currentColor) {
				let newBoard = board;
				newBoard[rowId][pegId] = currentColor;
				setBoard(newBoard);
				setBoardBool(!boardBool);
			}
		};

		const showClues = () => {
			const clueBoardList:JSX.Element[] = [];
			if (clueBoard || typeof clueBoard !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					for (let j = 0; j < pegsInRow; j++) {
						clueBoardList.push(<CluePeg className={clueBoard[i][j] ? clueBoard[i][j] : Color.Black} />);
					}
				}
				setClueBoardView(clueBoardList);
			}
		};
		
		const fillViewBoard = () => {
			const boardList = [];
			if (board || typeof board !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					boardList.push(
						<Row
							key= {i}
							rowId= {i}
							row= {board[i]}
							colorPeg= {colorPeg}
							pegsInRow= {pegsInRow}
						/>
					);
				}
				setBoardView(boardList);
			}
			showClues();
		};

		fillViewBoard();
	}, [board, currentColor, turn, boardBool, clueBoard]);

	return (
		<Fragment>
			<div id="board-content">
				<div id="board">{ boardView }</div>
				<div id="board-clue">{ clueBoardView }</div>
				<div id="mastermind">
					<button className="button buttonCheck" onClick={ checkCode }>Check</button>
					<div id="color-peg-options">{ showColorPegOptions() }</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Board;
