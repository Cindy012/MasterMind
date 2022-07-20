import { Color } from "./Color";
import Peg from "./Peg";

interface RowProps {
    row?: Color[];
    rowId: number;
    pegsInRow: number;
    colorPeg?: (rowId: number, pegId: number) => void;
}

const Row:React.FC<RowProps> = ({ rowId, row, pegsInRow, colorPeg }) => {
    const fillRow = () => {
        const rowsList = [];
        for (let i = 0; i < pegsInRow; i++) {
            if (row) {
                rowsList.push(
                    <Peg
                        key= {i}
                        rowId= {rowId}
                        pegId= {i}
                        className= {row[i]}
                        colorPeg= {colorPeg}
                    />
                );
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
