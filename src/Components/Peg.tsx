import { Color } from "./Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className: Color;
    selectColor?: (color: Color) => void;
    colorPeg?: (rowId: number, pegId: number) => void;
    colorOption?: boolean;
    colorIsActive?: boolean;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className, selectColor, colorPeg, colorOption, colorIsActive }) => {
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

    return (
        <button 
            className={ colorOption ? (
                colorIsActive ? `peg peg__${className} peg__peg-option__selected`
                        : `peg peg__${className} peg__peg-option`)
                    : `peg peg__${className}` 
                } 
            onClick={() => {
                className && !colorPeg ? selectedColor(className) : colorSelectedPeg(rowId, pegId);
            }}
        />
    );
};
  
export default Peg;
