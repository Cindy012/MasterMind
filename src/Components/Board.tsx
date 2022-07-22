import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard, initializeCluesBoard } from './BoardInitializer';
import { createCode } from './Code';
import Peg from './Peg';
import Row from './Row';
import CluePeg from './CluePeg';
import Modal from '../Modal/Modal';

const Board = () => {
	const totalRows = 8;
	const pegsInRow = 4;

	const [turn, setTurn] = useState<number>(0);
	const [code, setCode] = useState<Color[]>(createCode(pegsInRow));
	const [currentColor, setCurrentColor] = useState<Color>();
	const [gameStatus, setGameStatus] = useState<number>(0); // 0: not filled, 1: winner, 2: loser
	const [board, setBoard] = useState<Color[][]>(initializeBoard(totalRows, pegsInRow));
	const [cluesBord, setCluesBoard] = useState<Color[][]>(initializeCluesBoard(totalRows, pegsInRow));
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [cluesBoardView, setCluesBoardView] = useState<JSX.Element[]>();
	const [colorPegOptionsView, setColorPegOptionsView] = useState<JSX.Element[]>();
	const [modalTitle, setModalTitle] = useState<string>();
	const [showModal, setShowModal] = useState<boolean>(false);

	const selectCurrentColor = (color: Color) => setCurrentColor(color);

	const resetGame = () => {
		setCode(createCode(pegsInRow));
		setTurn(0);
		setBoard(initializeBoard(totalRows, pegsInRow));
		setCluesBoard(initializeCluesBoard(totalRows, pegsInRow));
		setGameStatus(0);
	};

	const checkCode = () => {
		if (turn < totalRows && board[turn].includes(Color.White)) {
			setModalTitle('Not yet');
			setShowModal(true);
		} else if (turn < totalRows) {
			let newCluesBord = cluesBord;
			code.forEach((color, index) => {
				if (color === board[turn][index]) {
					newCluesBord[turn][index] = Color.Black;
				} else if (colorContainsInCode(board[turn][index])) {
					newCluesBord[turn][index] = Color.Red;
				}
			});
			setCluesBoard([...newCluesBord]);
			isGameOver() ? setShowModal(true) : setTurn(turn + 1);
		}
	};

	const isGameOver = () => {
		if (isCodeCorrect() && turn < totalRows ) {
			setModalTitle('Winner!');
			setGameStatus(1);
			return true;
		} else if (board[turn] !== code && turn === totalRows - 1) {
			setModalTitle('Loser!');
			setGameStatus(2);
			return true;
		}
		return false;
	};

	const isCodeCorrect = () => {
		let i = 0;
		while (i < pegsInRow) {
			if (code[i] !== board[turn][i]) { 
				return false; 
			};
			i++;
		}
		return true;
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
		const colorPeg = (rowId: number, pegId: number) => {
			if (rowId === turn && board && currentColor) {
				let newBoard = board;
				newBoard[rowId][pegId] = currentColor;
				setBoard([...newBoard]);
			}
		};
		
		const fillViewBoard = () => {
			const boardList = [];
			if (board || typeof board !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					boardList.push(
						<Row
							key={ i }
							rowId={ i }
							row={ board[i] }
							colorPeg={ colorPeg }
							pegsInRow={ pegsInRow }
							pegIsActive={ turn === i }
						/>
					);
				}
				setBoardView([...boardList]);
			}
		};

		fillViewBoard();
	}, [board, currentColor, turn]);

	useEffect(() => {
		function showColorPegOptions() {
			let colorList = [];
			let colorOptions = Object.values(Color);
			colorOptions.splice(6, 7); // rm black & white
			while (colorOptions.length > 0) {
				if (currentColor && currentColor === colorOptions[colorOptions.length - 1]) {
					colorList.push(
						<Peg
							className={ colorOptions[colorOptions.length - 1] }
							selectColor={ selectCurrentColor }
							colorOption
							colorOptionIsActive
						/>
					);
				} else {
					colorList.push(
						<Peg
							className={ colorOptions[colorOptions.length - 1] }
							selectColor={ selectCurrentColor } 
							colorOption
						/>
					);
				}
				colorOptions.pop();
			}
			setColorPegOptionsView([...colorList]);
		};

		showColorPegOptions();
	}, [currentColor]);

	useEffect(() => {
		const fillClueRow = (row: number) => {
			const clueRowList:JSX.Element[] = [];
			if (cluesBord || typeof cluesBord !== 'undefined') {
				for (let j = 0; j < pegsInRow; j++) {
					clueRowList.push(
						<CluePeg key={ j } className={ cluesBord[row][j] } />
					);
				}
			}

			return (
				<div key={row} className="cluerow">{ clueRowList }</div>
			);
		};

		const showClues = () => {
			const cluesBoardList:JSX.Element[] = [];
			if (cluesBord || typeof cluesBord !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					cluesBoardList.push(fillClueRow(i));
				}
				setCluesBoardView([...cluesBoardList]);
			}
		};

		showClues();
	}, [cluesBord, turn]);

	return (
		<Fragment>
			<div className="mastermind__board-content">
				<div className="board">{ boardView }</div>
				<div className="board-clue">{ cluesBoardView }</div>
				<div className="mastermind__side">
					<h2>{ turn === totalRows ? turn : turn + 1 }</h2>
					<button className="button button__check" onClick={ () => checkCode() }>Check</button>
					<div className="color-peg-options">{ colorPegOptionsView }</div>
				</div>
			</div>
            <Modal
				title={ modalTitle }
                show={ showModal }
                setShowModal={ setShowModal }
				gameStatus={ gameStatus }
				resetGame={ () => resetGame() }
            	hideCloseButton
            />
		</Fragment>
	);
};

export default Board;
