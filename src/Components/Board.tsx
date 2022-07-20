import { Fragment, useEffect, useState } from 'react';
import { Color } from './Color';
import { initializeBoard, initializeCluesBoard } from './BoardInitializer';
import { createCode } from './Code';
import Peg from './Peg';
import Row from './Row';
import CluePeg from './CluePeg';
import Modal from '../Modal/Modal';

const Board = () => {
	const totalRows = 12;
	const pegsInRow = 4;
	const [board, setBoard] = useState<Color[][]>(initializeBoard());
	const [turn, setTurn] = useState<number>(0);
	const [boardView, setBoardView] = useState<JSX.Element[]>();
	const [cluesBord, setCluesBoard] = useState<Color[][]>(initializeCluesBoard());
	const [cluesBoardView, setCluesBoardView] = useState<JSX.Element[]>();
	const [currentColor, setCurrentColor] = useState<Color>();
	const [boardBool, setBoardBool] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [code] = useState<Color[]>(createCode()); // , setNewCode
	const [gameStatus, setGameStatus] = useState<number>(0); // 0: not filled, 1: winner, 2: loser

	const [modalTitle, setModalTitle] = useState<string>('No name');

	const selectCurrentColor = (color: Color) => setCurrentColor(color);

	function showColorPegOptions() {
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

	const checkCode = () => {
		if (turn < totalRows && board[turn].includes(Color.White)) {
			setModalTitle('Not yet');
			setShowModal(true);
		} else if (turn < totalRows){
			let newCluesBord = cluesBord;
			code.forEach((color, index) => {
				if (color === board[turn][index]) {
					newCluesBord[turn][index] = Color.Black;
				} else if (colorContainsInCode(board[turn][index])){ 
					// Now "could be" is even when the color of the user code doesn't exist multiple times => could give a wrong indicator to user 
					newCluesBord[turn][index] = Color.Red;
				}
			});
			setCluesBoard(newCluesBord);
			setTurn(turn + 1);
		}
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
				setBoard(newBoard);
				setBoardBool(!boardBool);
			}
		};
		
		const fillViewBoard = () => {
			const boardList = [];
			if (board || typeof board !== 'undefined') {
				for (let i = 0; i < totalRows; i++) {
					boardList.push(
						<Row
							key= {i}
							rowId= {i}
							row= {board[i]}
							colorPeg= {colorPeg}
							pegsInRow= {pegsInRow}
						/>
					);
				}
				setBoardView(boardList);
			}
		};

		const checkGameStatus = () => {
			if (board[turn] === code && turn < 12 ) {
				setModalTitle('You win!');
				setGameStatus(1);
				setTurn(13);
				setShowModal(true);
			} else if (board[turn] !== code && turn === 12) {
				setModalTitle('You lose!');
				setGameStatus(2);
				setShowModal(true);
			}
		}
		checkGameStatus();

		fillViewBoard();
	}, [board, currentColor, turn, boardBool, cluesBord, code]);

	useEffect(() => {
		const fillClueRow = (row: number) => {
			const clueRowList:JSX.Element[] = [];
			if (cluesBord || typeof cluesBord !== 'undefined') {
				for (let j = 0; j < pegsInRow; j++) {
					clueRowList.push(<CluePeg key={j} className={cluesBord[row][j]} />);
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
				setCluesBoardView(cluesBoardList);
			}
		};

		showClues();
	}, [cluesBord, turn]);

	return (
		<Fragment>
			<div id="board-content">
				<div id="board">{ boardView }</div>
				<div id="board-clue">{ cluesBoardView }</div>
				<div id="mastermind">
					<button className="button buttonCheck" onClick={ () => checkCode() }>Check</button>
					<div id="color-peg-options">{ showColorPegOptions() }</div>
				</div>
			</div>
            <Modal
				title= { modalTitle }
                show={ showModal }
                setShowModal={ setShowModal }
				gameStatus={ gameStatus }
            	hideCloseButton
            />
		</Fragment>
	);
};

export default Board;
