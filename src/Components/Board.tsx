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

	const colorPeg = (rowId: number, pegId: number) => {
		console.log('hi');
		if (rowId === turn && board && currentColor) { // currentColor is undefined
			let newBoard = board;
			newBoard[rowId][pegId] = currentColor;
			setBoard(newBoard);
		}
	};

	function showClues() {
		return (
			<Fragment>
				{/* 4 little clue pegs */}
			</Fragment>
		)
	};

	const fillViewBoard = () => {
		const boardList = [];
		for (let i = 0; i < totalRows; i++) {
			if (board || typeof board !== 'undefined') {
				boardList.push(
					<Row
						key= {i}
						rowId= {i}
						row= {board[i]}
						colorPeg= {colorPeg}
						pegsInRow= {pegsInRow}
					/>
				);
			} else {
				boardList.push(
					<Row key={i} rowId={i} pegsInRow= {pegsInRow} />,
				);
			}
		}
      	setBoardView(boardList);
	};

	useEffect(() => {
		console.log(currentColor);
    }, [currentColor]);

	useEffect(() => {
		fillViewBoard();
	}, [board]);

	return (
		<div id="board-content">
			<div id="board">{ boardView }</div>
			<div id="board-clue">{ showClues() }</div>
			<div id='color-peg-options'>{ showColorPegOptions() }</div>
		</div>
	);
};

export default Board;
