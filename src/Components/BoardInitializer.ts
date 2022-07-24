import { Color } from "./Color";

export function initializeBoard(totalRows: number, pegsInRow: number) {
    let boardList:Array<Color>[] = [];
    for (let i = 0; i < totalRows; i++) {
        let row = new Array<Color>();
        for (let j = 0; j < pegsInRow; j++) {
            row.push(Color.White);
        }
        boardList.push(row);
    }
    return boardList;
};
