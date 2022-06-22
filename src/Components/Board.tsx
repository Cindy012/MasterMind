import { Fragment, useEffect, useState } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
	const [currentColor, setCurrentColor] = useState<Color>(Color.White); 

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
				<Peg className= {Color.Red} onClick= {selectCurrentColor} />
				<Peg className= {Color.Orange} onClick= {selectCurrentColor} />
				<Peg className= {Color.Green} onClick= {selectCurrentColor} />
				<Peg className= {Color.LightBlue} onClick= {selectCurrentColor}/>
				<Peg className= {Color.Blue} onClick= {selectCurrentColor}/>
				<Peg className= {Color.Purple} onClick= {selectCurrentColor}/>
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
