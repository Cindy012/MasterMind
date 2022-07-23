import { Fragment } from "react";
import Board from "./Board";

const MasterMind = () => {
	return (
		<Fragment>
			<div className="mastermind">
				<div className="mastermind__header">
					<h1>MasterMind</h1>
				</div>
				<Board />
			</div>
		</Fragment>
	);
};

export default MasterMind;
