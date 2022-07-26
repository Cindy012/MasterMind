import { Color } from "./Color";

export const totalRows = 8;
export const pegsInRow = 4;

export function initializeBoard() {
    let boardList:Array<Color>[] = [];
    for (let i = 0; i < totalRows; i++) {
        boardList.push(createRow());
    }
    return boardList;
};

export function createRow() {
    let row = new Array<Color>();
    for (let j = 0; j < pegsInRow; j++) {
        row.push(Color.White);
    }
    return row;
}