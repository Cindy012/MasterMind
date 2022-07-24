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

export function getGuessClues(code: Color[], guess: Color[]): Color[] {
    let codeClues: Color[] = new Array(4);
    let guessCopy = [...guess];
    let i = 0;
    while (i < guess.length) {
        if (code[i] === guess[i]) {
            codeClues[i] = Color.Black;
            guessCopy.splice(i, 1);
        } else {
            let currentIndex = i;
            let loop = true;
            console.log(code);
            code.forEach((color, index) => {
                if (color === guess[currentIndex]
                    && !colorIsChecked(code, color, index, currentIndex)
                    && codeClues[index] !== Color.Black
                    && codeClues[index] !== Color.Red
                    && currentIndex === index
                    && loop) {
                    codeClues[currentIndex] = Color.Red;
                    loop = false;
                }
            });
        }
        i++;
    }
    return codeClues;
};

function colorIsChecked(code: Color[], color: Color, index: number, currentIndex: number): boolean {
    let i = 0;
    while (i < currentIndex) {
        if (code[i] === color) {
            return true;
        }
        i++;
    }
    console.log(index + 'hihi');
    return false;
}
