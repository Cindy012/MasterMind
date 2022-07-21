import { Color } from "./Color";

const totalRows = 12;
const pegsInRow = 4;

export function initializeBoard() {
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

export function initializeCluesBoard() {
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
