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
