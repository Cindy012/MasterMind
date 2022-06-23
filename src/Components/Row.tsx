import { Color } from "../Color";
import Peg from "./Peg";

interface RowProps {
    board?: Color[][];
    rowId: number;
    pegsInRow: number;
    colorPeg?: (rowId: number, pegId: number) => void;
}
const Row:React.FC<RowProps> = ({ rowId, board, pegsInRow, colorPeg }) => {

    const fillRow = () => {
        const rowsList = [];
        for (let i = 0; i < pegsInRow; i++) {
            if (board || typeof board !== 'undefined') {
                if(board[rowId][i] !== Color.White) {
                    rowsList.push(<Peg 
                        key= {i}
                        rowId= {rowId}
                        pegId= {i}
                        className= {board[rowId][i]}
                        colorPeg= {colorPeg}
                    />);
                } else {
                    rowsList.push(<Peg 
                        key= {i}
                        rowId= {rowId}
                        pegId= {i}
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
