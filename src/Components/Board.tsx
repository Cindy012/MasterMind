import { Fragment, useEffect, useState } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	let turn = 0;
	const totalRows = 12;
	const pegsInRow = 4;
	const [board, setBoard] = useState<Color[][]>();
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [currentColor, setCurrentColor] = useState<Color>();

	function initializeBoard() {
		let boardList:Array<Color>[] = [];
		for(let i = 0; i < totalRows; i++) {
			let row = new Array<Color>();
			for(let j = 0; j < pegsInRow; j++) {
				row.push(Color.White);
			}
			boardList.push(row);
		}
		setBoard(boardList);
	};

	const selectCurrentColor = (color: Color) => setCurrentColor(color);

	function showAvailableColors() {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board]);

	useEffect(() => {
		initializeBoard();
    }, []);

	return (
		<div id="board-content">
			<div id="board">{ boardView }</div>
			<div id="board-clue">{ showClues() }</div>
			<div id='color-peg-options'>{ showAvailableColors() }</div>
		</div>
	);
};

export default Board;
