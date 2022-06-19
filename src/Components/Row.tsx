// import React, { useEffect, useState } from 'react';
import Peg from "./Peg";

interface RowProps {
    rowId: number;
}
const Row:React.FC<RowProps> = ( {rowId}) => {
    const Pegs = 4;
    //   const [row, setRow] = useState<JSX.Element[]>();

    //   useEffect(() => {
    //     fillRow();
    //   }, []);

    //   const fillRow = () => {
    //     const newRow = [];
    //       let i = 0;
    //       while(i < Pegs) {
    //         newRow.push(<Peg />);
    //       }

    //       setRow(newRow);
    //   }

    const fillRow = () => {
        const rowsList = [];

        for (let i = 0; i < Pegs; i++) {
            rowsList.push(
            <Peg key={i} rowId={ rowId } PegId={i}/>
            );
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
