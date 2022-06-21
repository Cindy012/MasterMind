import { Fragment } from 'react';
import { Color } from '../Color';
import Peg from './Peg';
import Row from './Row';

const Board = () => {
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

	function showAvailableColors() {
		return (
			<Fragment>
				<Peg className = {Color.Red}/>
				<Peg className = {Color.Orange}/>
				<Peg className = {Color.Green}/>
				<Peg className = {Color.LightBlue}/>
				<Peg className = {Color.Blue}/>
				<Peg className = {Color.Purple}/>
			</Fragment>
		)
	};

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
