import { Fragment, useEffect, useState } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	let chance = 0;
	const totalRows = 12;
	const pegsInRow = 4;
	const [currentColor, setCurrentColor] = useState<Color>(Color.White);
	const [board, setBoard] = useState<Color[][]>();
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [currentRow, setCurrentRow] = useState<Color[]>(new Array(4));

	const fillViewBoard = () => {
		const boardList = [];
		for (let i = 0; i < totalRows; i++) {
			if (board || typeof board !== 'undefined') {
				boardList.push(
					<Row 
						key= {i}
						rowId= {i}
						board= {board}
						colorPeg= {updateCurrentRow}
						pegsInRow= {pegsInRow}
					/>
				);
			} else {
				boardList.push(
					<Row key={i} rowId={i} pegsInRow= {pegsInRow}/>,
				);
			}
		}
      	setBoardView(boardList);
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

	const updateCurrentRow= (rowId: number, pegId: number) => {
		if (rowId === chance) {
			console.log(pegId);
			const newCurrentRow: Color[] = currentRow;
			newCurrentRow[pegId] = currentColor;
			setCurrentRow(newCurrentRow);
		}
	}
	
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
		setBoard(boardList);
	}

	useEffect(() => {
		console.log(currentColor);
    }, [currentColor]);

	useEffect(() => {
		fillViewBoard();
		setCurrentRow([]);
	}, [board]);

	useEffect(() => {
		console.log(currentRow);
    }, [currentRow]);

	useEffect(() => {
		initializeBoard();
    }, []);

	return (
		<div id="board-content">
			<div id="board">
				{ boardView }
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
