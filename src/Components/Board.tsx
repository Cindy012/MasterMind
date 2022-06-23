import { Fragment, useEffect, useState } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	// const chance = 0;
	const totalRows = 12;
	const pegsInRow = 4;
	const [currentColor, setCurrentColor] = useState<Color>(Color.White);
	const [board, setBoard] = useState<Color[][]>();
	// const [currentRow, setCurrentRow] = useState<Color[]>(new Array(4));

	const fillRows = () => {
		const rowsList = [];

		for (let i = 0; i < totalRows; i++) {
			if (board || typeof board !== 'undefined') {
				rowsList.push(
					<Row key={i} rowId={i} board={board} />,
				);
			} else {
				rowsList.push(
					<Row key={i} rowId={i} />,
				);
			}
		}
      	return rowsList;
	};

	function showClues() {
		return (
			<Fragment>
				{/* 4 little clue pegs */}
			</Fragment>
		)
	};

	const selectCurrentColor= (color: Color) => {
		setCurrentColor(color);
	};

	// const updateCurrentRow= (pegId: number, color: Color) => {
	// 	const newCurrentRow: Color[] = currentRow;
	// 	newCurrentRow[pegId] = color;
	// 	setCurrentRow(newCurrentRow);
	// }
	
	function showAvailableColors() {
		return (
			<Fragment>
				<Peg className= {Color.Red} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Orange} selectColor= {selectCurrentColor} />
				<Peg className= {Color.Green} selectColor= {selectCurrentColor} />
				<Peg className= {Color.LightBlue} selectColor= {selectCurrentColor}/>
				<Peg className= {Color.Blue} selectColor= {selectCurrentColor}/>
				<Peg className= {Color.Purple} selectColor= {selectCurrentColor}/>
			</Fragment>
		)
	};

	function initializeBoard() {
		let boardList:Array<Color>[] = [];
		for(let i = 0; i < totalRows; i++) {
			let row = new Array<Color>();
			for(let j = 0; j < pegsInRow; j++) {
				row.push(Color.White);
			}
			boardList.push(row);
		}
		return boardList;
	}

	useEffect(() => {
		console.log(currentColor);
    }, [currentColor]);

	// useEffect(() => {
	// 	fillRows();
	//  setCurrentRow([]);
    // }, [board]);

	useEffect(() => {
		const newBoard = initializeBoard();
		// console.log(newBoard); 	
		setBoard(newBoard);
    }, []);

	return (
		<div id="board-content">
			<div id="board">
				{ fillRows() }
			</div>
			<div id="board-clue">
				{ showClues() }
			</div>
			<div id='color-peg-options'>
				{ showAvailableColors() }
			</div>
		</div>
	);
};

export default Board;
