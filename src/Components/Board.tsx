import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard } from './BoardInitializer';
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
		<div id="board-content">
			<div id="board">{ boardView }</div>
			<div id="board-clue">{ showClues() }</div>
			<div id='color-peg-options'>{ showColorPegOptions() }</div>
		</div>
	);
};

export default Board;
