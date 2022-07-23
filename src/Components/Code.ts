import { Color } from "./Color";

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

export function createCode(pegs: number) {
    let code:Color[] = [];
    let color;
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

export function colorContainsInCode(code: Color[], pegColor: Color) {
    let result = false;
    code.forEach(color => {
        if (color === pegColor) {
            result = true;
        }
    });
    return result;
};