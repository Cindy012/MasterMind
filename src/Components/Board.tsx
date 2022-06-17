// import React, { useEffect, useState } from 'react';

import Row from "./Row";

const Board = () => {
    const chance = 12;

    const fillRows = () => {
      const rowsList = [];

      for (let i = 0; i < chance; i++) {
          rowsList.push(
            <Row key={i}/>
          );
      }

      return rowsList;
  };

  return (
    <div id="mastermind">
      <h1 className="top">MasterMind</h1>
      <div id='board'>
          { fillRows() }
      </div>
    </div>
  );
}

export default Board;

