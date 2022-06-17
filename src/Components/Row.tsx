// import React, { useEffect, useState } from 'react';
// import Pin from './Pin';

import Pin from "./Pin";

const Row = () => {
  const pins = 4;
//   const [row, setRow] = useState<JSX.Element[]>();

//   useEffect(() => {
//     fillRow();
//   }, []);

//   const fillRow = () => {
//     const newRow = [];
//       let i = 0;
//       while(i < pins) {
//         newRow.push(<Pin />);
//       }

//       setRow(newRow);
//   }

const fillRow = () => {
    const rowsList = [];

    for (let i = 0; i < pins; i++) {
        rowsList.push(
          <Pin key={i}/>
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