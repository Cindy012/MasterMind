import { Fragment, useState } from "react";
import Modal from "../Modal/Modal";
import Board from "./Board";

const MasterMind = () => {
	const modalTitle = "Mastermind game info"
	const [showModal, setShowModal] = useState<boolean>(false);
	const gameInfo = "Mastermind is a game to guess a secret code that exists of 4 pegs. The player has max 8 chances to guess the color code.";
  
	return (
		<Fragment>
			<div className="mastermind">
				<h1>MasterMind</h1>
				<button className="button__icon" onClick={ () => setShowModal(true) }>
					<img className="image__icon" src={ require('../image/information.png') } alt=""/>
				</button>
				<Board />
			</div>
			<Modal
				title= { modalTitle }
				show={ showModal }
				setShowModal={ setShowModal }
				content= { gameInfo }
				hideCloseButton
			/>
		</Fragment>
	);
};

export default MasterMind;
