import { createRow, pegsInRow } from "./Board";
import { Color } from "./Color";

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
};

export function createCode() {
    let code:Color[] = [];
    let color;
    let pegs = pegsInRow;
    while (pegs > 0 ) {
        color = randomEnum(Color);
        if (color !== Color.Black && color !== Color.White) {
            code.push(color);
            pegs--;
        }
    }
    return code;
};

export function isCodeCorrect(code: Color[], row: Color[]) {
    let i = 0;
    while (i < row.length) {
        if (code[i] !== row[i]) { 
            return false; 
        };
        i++;
    }
    return true;
};

function colorIsInCode(code: Color[], color: Color) {
    let i = 0;
    while (i < code.length) {
        if (code[i] === color) {
            return true;
        }
        i++;
    }
    return false;
};

export function getClues(code: Color[], guess: Color[]): Color[] {
    let codeClues: Color[] = createRow();
    // Made copies of code and guess to prevent that the original arrays won't be overwritten
    let codeCopy = [...code];
    let guessCopy = [...guess];
    let i = 0;
    while (i < guess.length) {
        if (codeCopy[i] === guessCopy[i]) {
            codeClues[i] = Color.Black;
            codeCopy[i] = guessCopy[i] = Color.White; // It prevents from being checked again for if color contains in code later.
        }
        i++;
    }

    while (i > 0) {
        if (guessCopy[i] !== Color.White && colorIsInCode(codeCopy, guessCopy[i])){
            codeClues[i] = Color.Red;
            codeCopy[i] = guessCopy[i] = Color.White;
        }
        i--;
    }
    return codeClues;
};