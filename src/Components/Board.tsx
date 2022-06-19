import Row from './Row';

const Board = () => {
	const totalRows = 12;
	const fillRows = () => {
		const rowsList = [];

		for (let i = 0; i < totalRows; i++) {
			rowsList.push(
			<Row rowId={i} />,
			);
		}
      	return rowsList;
	};

	return (
		<div id="board">
			{ fillRows() }
		</div>
	);
};

export default Board;
