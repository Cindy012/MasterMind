import { Fragment, useState } from "react";
import Modal from "../Modal/Modal";
import Board from "./Board";

const MasterMind = () => {
	const modalTitle = "Mastermind game info"
	const [showModal, setShowModal] = useState<boolean>(false);
	
	const getGameInfo = () => {
		return (
			<article>
				<p>Mastermind is a game to guess a secret code that exists on 4 pegs. The player has 8 chances to guess the color code.</p>
				<p>To give the pegs a color, select from the side of the board one of the color pegs. After selecting a color the player can fill the row of the board.</p>
				<p>When the player selected a code pattern, the code will be reviewed and provides feedback through clues. The black peg means that the chosen peg color and position is correct. The red peg means that the peg color contains in the code although the position is not.</p>
			</article>
		);
	};
  
	return (
		<Fragment>
			<div className="mastermind">
				<div className="mastermind__flex">
					<h1>MasterMind</h1>
					<button className="button__icon" onClick={ () => setShowModal(true) }>
						<img className="image__icon" src={ require('../image/information.png') } alt=""/>
					</button>
				</div>
				<Board />
			</div>
			<Modal
				title= { modalTitle }
				show={ showModal }
				setShowModal={ setShowModal }
				content= { getGameInfo() }
				hideCloseButton
			/>
		</Fragment>
	);
};

export default MasterMind;
