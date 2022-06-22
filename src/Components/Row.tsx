import { Color } from "../Color";
import Peg from "./Peg";

interface RowProps {
    board?: Color[][];
    rowId: number;
}
const Row:React.FC<RowProps> = ({ rowId, board }) => {
    const Pegs = 4;

    const fillRow = () => {
        const rowsList = [];

        for (let i = 0; i < Pegs; i++) {
            // console.log(newBoard);
            // newBoard[0][0] = Color.Red;
            // console.log(newBoard);
            if (board || typeof board !== 'undefined') {
                if(board[rowId][i]) {
                    rowsList.push(<Peg 
                        key={i}
                        rowId={rowId}
                        pegId={i}
                        className= {board[rowId][i]}
                    />);
                } else {
                    rowsList.push(<Peg 
                        key={i}
                        rowId={rowId}
                        pegId={i}
                    />);
                }
            }
        }
        return rowsList;
    };

    return (
    <div className="row">
        { fillRow() }
    </div>
    );
}

export default Row;
