import { Color } from "../ts/Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className: Color;
    selectColor?: (color: Color) => void;
    colorPeg?: (rowId: number, pegId: number) => void;
    colorOption?: boolean;
    colorOptionIsActive?: boolean;
    pegIsActive?: boolean;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className, selectColor, colorPeg, colorOption, colorOptionIsActive, pegIsActive }) => {
    const colorSelectedPeg = (rowId?: number, pegId?: number) => {
        if (typeof rowId !== 'number' || typeof pegId !== 'number' || !colorPeg || typeof colorPeg === 'undefined') {
            return;
        }
        colorPeg(rowId, pegId);
    };

    const selectedColor = (color?: Color) => {
		if (!color || typeof color === 'undefined' || !selectColor) {
            return;
        }
        selectColor(color);
    };

    function getBtnClassName(): string {
        let btnClassName = `peg peg__${className} `;
        if (colorOption) {
            btnClassName += colorOptionIsActive ? `peg__active peg__selected` : `peg__active`;
        } 
        if (pegIsActive){
            btnClassName += pegIsActive ? `peg__active`: null;
        }
        return btnClassName;
    }

    return (
        <button 
            className={ getBtnClassName() } 
            onClick={() => {
                className && !colorPeg ? selectedColor(className) : colorSelectedPeg(rowId, pegId);
            }}
        />
    );
};
  
export default Peg;
