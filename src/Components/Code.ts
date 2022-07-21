import { Color } from "./Color";

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

export function createCode(pegs: number) {
    let code11:Color[] = [];
    let color;
    while (pegs > 0 ) {
        color = randomEnum(Color);
        if (color.toString() !== 'Black' || color.toString() !== 'White') {
            code11.push(color);
            pegs--;
        } else {
            console.log(color);
        }
    }
    console.log(code11);
    return code11;
};
