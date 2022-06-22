import { Fragment, useEffect, useState } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	const [currentColor, setCurrentColor] = useState<Color>(Color.White);
	const [board, setBoard] = useState<[[],[]]>();

	const totalRows = 12;
	const fillRows = () => {
		const rowsList = [];

		for (let i = 0; i < totalRows; i++) {
			rowsList.push(
			<Row key={i} rowId={i} />,
			);
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

	useEffect(() => {
		fillRows();
		console.log(currentColor);
    }, [currentColor]);

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
