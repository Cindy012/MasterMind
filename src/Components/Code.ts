import { Color } from "./Color";

// function randomEnum<T>(anEnum: T): T[keyof T] {
//     const enumValues = (Object.keys(anEnum) as unknown) as T[keyof T][];
//     const randomIndex = Math.floor(Math.random() * enumValues.length);
//     return enumValues[randomIndex];
//   }

export function createCode(pegs: number) {
    // let code11:Color[] = [];
    // let color;
    // while (pegs > 0 ) {
    //     color = randomEnum(Color);
    //     console.log(color);
    //     if (color !== Color.Black && color !== Color.White) {
    //         code11.push();
    //         pegs--;
    //     }
    // }
    // console.log(code11);
    
    let code:Color[] = [Color.Blue, Color.Green, Color.Red, Color.Orange]; // temp answer
    console.log(code);
    return code;
};
