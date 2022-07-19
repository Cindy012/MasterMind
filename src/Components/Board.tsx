import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard } from './BoardInitializer';
import { createCode } from './Code';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	let turn = 0;
	const totalRows = 12;
	const pegsInRow = 4;
	const [board, setBoard] = useState<Color[][]>(initializeBoard());
	const [boardView, setBoardView] = useState<JSX.Element[]>();
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

	function showClues() {
		return (
			<Fragment>
				{/* 4 little clue pegs */}
			</Fragment>
		)
	};

	// This will be executed when user selected all pegs in row. Otherwise the button is inactive
	const checkCode = () => {
		code.forEach((color, index) => {
			if (color === board[turn][index]) {
				console.log('yes');
			} else if (colorContainsInCode(board[turn][index])){ 
				// Now "could be" is even when the color of the user code exist multiple times => could give a wrong indicator to user 
				console.log('could be');
			} else {
				console.log('no');
			}
		});
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
		};

		fillViewBoard();
	}, [board, currentColor, turn, boardBool]);

	return (
		<Fragment>
			<div id="board-content">
				<div id="board">{ boardView }</div>
				<div id="board-clue">{ showClues() }</div>
				<div id="mastermind">
					<button className="button buttonCheck" onClick={ checkCode }>Check</button>
					<div id="color-peg-options">{ showColorPegOptions() }</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Board;
