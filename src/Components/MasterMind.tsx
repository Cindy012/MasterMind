import Board from "./Board";

const MasterMind = () => {
	const textInfo = "Mastermind is a game to guess a secret code that exists of 4 pegs. The player has max 12 chances to guess the color code.";
  
	return (
		<div className="mastermind">
			<h1>MasterMind</h1>
			<section>{ textInfo }</section>
			<Board />
		</div>
	);
};

export default MasterMind;
