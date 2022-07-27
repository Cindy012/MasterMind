import { useEffect, useState } from "react";

// Ts
import { createCode, getClues, isCodeCorrect } from "../ts/Game";
import { initializeBoard, pegsInRow, totalRows } from "../ts/Board";
import { Color } from "../ts/Color";

// Components
import Board from "./Board";
import CluePeg from "./CluePeg";
import GiveUpModal from "../Modal/GiveUpModal";
import Modal from "../Modal/Modal";
import Peg from "./Peg";
import Row from "./Row";
import { showCodeAnswer } from "./View";

// Images
import giveUpIcon from "../image/give-up.png";
import informationIcon from "../image/information.png";
import playAgainIcon from "../image/play-again.png";

const MasterMind = () => {
	const [turn, setTurn] = useState<number>(0);
	const [code, setCode] = useState<Color[]>(createCode());
	const [currentColor, setCurrentColor] = useState<Color>();
	const [gameStatus, setGameStatus] = useState<number>(1); // 0: gameInfo, 1: not filled, 2: winner, 3: loser
	const [board, setBoard] = useState({ gameBoard: initializeBoard(), clueBoard: initializeBoard()});
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [cluesBoardView, setCluesBoardView] = useState<JSX.Element[]>();
	const [colorPegOptionsView, setColorPegOptionsView] = useState<JSX.Element[]>();
	const [showModal, setShowModal] = useState(false);
	const [showGiveUpModal, setShowGiveUpModal] = useState(false);

	const selectCurrentColor = (color: Color) => setCurrentColor(color);
	
	const openModal = () => setShowModal(true);

	function openGameInfoModal() {
		setGameStatus(0);
		openModal();
	}

	const stopGame = () => setGameStatus(0);

	const resetGame = () => {
		setCode(createCode());
		setTurn(0);
		setBoard({ gameBoard: initializeBoard(), clueBoard: initializeBoard() });
		stopGame();
	};

	const checkCode = () => {
		if (gameStatus !== 2 && gameStatus !== 3) {
			if (turn < totalRows && board.gameBoard[turn].includes(Color.White)) {
				setGameStatus(1);
				openModal();
			} else if (turn < totalRows) {
				let newCluesBoard = board.clueBoard;
				newCluesBoard[turn] = getClues(code, board.gameBoard[turn]);
				setBoard({ gameBoard: board.gameBoard, clueBoard: [...newCluesBoard] });
				isGameOver() ? openModal() : setTurn(turn + 1);
			}
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

	useEffect(() => {
		const colorPeg = (rowId: number, pegId: number) => {
			if (rowId === turn && board.gameBoard && currentColor && gameStatus !== 2 && gameStatus !== 3) {
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
	}, [board.clueBoard, board.gameBoard, currentColor, gameStatus, turn]);

	useEffect(() => {
		function showColorPegOptions() {
			let colorList = [];
			let colorOptions = Object.values(Color);
			colorOptions.splice(6, 7); // Removes Color.Black & Color.White from colorOptions
			let color;
			while (colorOptions.length > 0) {
				color = colorOptions[colorOptions.length - 1];
				if (currentColor && currentColor === color) {
					colorList.push(
						<Peg
							key={ color }
							className={ color }
							selectColor={ selectCurrentColor }
							colorOption
							colorOptionIsActive
						/>
					);
				} else {
					colorList.push(
						<Peg
							key={ color }
							className={ color }
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
		<div className="mastermind">
			<div className="mastermind__header">
				<h1>MASTERMIND</h1>
			</div>
			<div className="mastermind__header__icons">
				<button className="button__icon" onClick={ () => setShowGiveUpModal(true) }>
					<img className="image__icon" src={ giveUpIcon } alt=""/>
				</button>
				<button className="button__icon" onClick={ () => resetGame() }>
					<img className="image__icon" src={ playAgainIcon } alt=""/>
				</button>
				<button className="button__icon" onClick={ () => openGameInfoModal() }>
					<img className="image__icon" src={ informationIcon } alt=""/>
				</button>
			</div>
			{ gameStatus === 3 ? showCodeAnswer(code) : null }
			<Board
				boardView={ boardView }
				cluesBoardView={ cluesBoardView }
				colorPegOptionsView={ colorPegOptionsView }
				checkCode={ checkCode } 
				turn={ turn }
			/>
            <Modal
                show={ showModal}
                setShowModal={ setShowModal }
				gameStatus={ gameStatus }
				resetGame={ resetGame }
            	hideCloseButton
            />
			<GiveUpModal
				title='Stop Game'
				show={ showGiveUpModal }
				setShowModal={ setShowGiveUpModal }
				showAnswer={ stopGame }
				hideCloseButton
			/>
		</div>
	);
};

export default MasterMind;
