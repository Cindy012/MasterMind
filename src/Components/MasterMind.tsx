import { Fragment, useState } from "react";
import Modal from "../Modal/Modal";
import Board from "./Board";

const MasterMind = () => {
	const modalTitle = "Mastermind game info"
	const [showModal, setShowModal] = useState<boolean>(false);
	
	const getGameInfo = () => {
		return (
			<article className="modal-content">
			<p>MasterMind is a game whereby the user guesses code on four pegs. The player has eight chances to guess the color code.</p>
			<p>To choose a color, select from the side one of the colors pegs. After selecting the color, the player can fill the row of the board.</p>
			<p>When the player selects a code pattern, the code will be reviewed and provides feedback through clues. The black peg means that the chosen peg color and position are correct. The red peg means that the peg color retains in the code although the position is not.</p>
			</article>
		);
	};
  
	return (
		<Fragment>
			<div className="mastermind">
				<div className="mastermind__header">
					<h1>MASTERMIND</h1>
					<button className="button__icon" onClick={ () => setShowModal(true) }>
						<img className="image__icon" src={ require('../image/information.png') } alt=""/>
					</button>
				</div>
				<Board />
			</div>
			<Modal
				title={ modalTitle }
				show={ showModal }
				setShowModal={ setShowModal }
				gameInfo={ getGameInfo() }
				hideCloseButton
			/>
		</Fragment>
	);
};

export default MasterMind;
