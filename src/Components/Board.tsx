import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard, initializeCluesBoard } from './BoardInitializer';
import { colorContainsInCode, createCode, isCodeCorrect } from './Code';
import Peg from './Peg';
import Row from './Row';
import CluePeg from './CluePeg';
import Modal from '../Modal/Modal';
import { getGameInfo } from './View';

const Board = () => {
	const totalRows = 8;
	const pegsInRow = 4;

	const [turn, setTurn] = useState<number>(0);
	const [code, setCode] = useState<Color[]>(createCode(pegsInRow));
	const [currentColor, setCurrentColor] = useState<Color>();
	const [gameStatus, setGameStatus] = useState<number>(0); // 0: gameInfo, 1: not filled/ongoing, 2: winner, 3: loser
	const [board, setBoard] = useState({ gameBoard: initializeBoard(totalRows, pegsInRow), clueBoard: initializeCluesBoard(totalRows, pegsInRow)});
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [cluesBoardView, setCluesBoardView] = useState<JSX.Element[]>();
	const [colorPegOptionsView, setColorPegOptionsView] = useState<JSX.Element[]>();
	const [showModal, setShowModal] = useState(false);

	const selectCurrentColor = (color: Color) => setCurrentColor(color);
	const openModal = () => setShowModal(true);

	const resetGame = () => {
		setCode(createCode(pegsInRow));
		setTurn(0);
		setBoard({ gameBoard: initializeBoard(totalRows, pegsInRow), clueBoard: initializeCluesBoard(totalRows, pegsInRow) });
		setGameStatus(1);
	};

	const checkCode = () => {
		if (turn < totalRows && board.gameBoard[turn].includes(Color.White)) {
			setGameStatus(1);
			openModal();
		} else if (turn < totalRows) {
			let newCluesBoard = board.clueBoard;
			code.forEach((color, index) => {
				if (color === board.gameBoard[turn][index]) {
					newCluesBoard[turn][index] = Color.Black;
				} else if (colorContainsInCode(code, board.gameBoard[turn][index])) {
					newCluesBoard[turn][index] = Color.Red;
				}
			});
			setBoard({ gameBoard: board.gameBoard, clueBoard: [...newCluesBoard] });
			isGameOver() ? openModal() : setTurn(turn + 1);
		}
	};

	const isGameOver = () => {
		if (isCodeCorrect(code, board.gameBoard[turn]) && turn < totalRows ) {
			setGameStatus(2);
			return true;
		} else if (board.gameBoard[turn] !== code && turn === totalRows - 1) {
			setGameStatus(3);
			return true;
		}
		return false;
	};

	function openGameInfoModal(): void {
		setGameStatus(0);
		openModal();
	}

	useEffect(() => {
		const colorPeg = (rowId: number, pegId: number) => {
			if (rowId === turn && board.gameBoard && currentColor) {
				let newBoard = board.gameBoard;
				newBoard[rowId][pegId] = currentColor;
				setBoard({ gameBoard: [...newBoard], clueBoard: board.clueBoard });
			}
		};
		
		const fillViewBoard = () => {
			const boardList = [];
			if (board.gameBoard || typeof board.gameBoard !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					boardList.push(
						<Row
							key={ i }
							rowId={ i }
							row={ board.gameBoard[i] }
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
	}, [board.clueBoard, board.gameBoard, currentColor, turn]);

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
			if (board.clueBoard || typeof board.clueBoard !== 'undefined') {
				for (let j = 0; j < pegsInRow; j++) {
					clueRowList.push(
						<CluePeg key={ j } className={ board.clueBoard[row][j] } />
					);
				}
			}

			return (
				<div key={row} className="cluerow">{ clueRowList }</div>
			);
		};

		const showClues = () => {
			const cluesBoardList:JSX.Element[] = [];
			if (board.clueBoard || typeof board.clueBoard !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					cluesBoardList.push(fillClueRow(i));
				}
				setCluesBoardView([...cluesBoardList]);
			}
		};

		showClues();
	}, [board.clueBoard, turn]);

	return (
		<Fragment>
			<div className="mastermind__header__icons">
				<button className="button__icon" onClick={ () => resetGame() }>
					<img className="image__icon" src={ require('../image/play-again.png') } alt=""/>
				</button>
				<button className="button__icon" onClick={ () => openGameInfoModal() }>
					<img className="image__icon" src={ require('../image/information.png') } alt=""/>
				</button>
			</div>
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
                show={ showModal}
                setShowModal={ setShowModal }
				gameStatus={ gameStatus }
				resetGame={ () => resetGame() }
				gameInfo={ getGameInfo() }
            	hideCloseButton
            />
		</Fragment>
	);
};

export default Board;
