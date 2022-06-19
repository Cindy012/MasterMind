import Board from "./Board";

const MasterMind = () => {
	const textInfo = "Mastermind is a game to to guess a secret code that exists of 4 pegs. The player has max 12 chances to guess their color.";
  
	return (
	<div id="mastermind">
		<h1 className="top">MasterMind</h1>
		<section>{ textInfo }</section>
		<Board />
	</div>
	);
};

export default MasterMind;
