import { Color } from "./Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className?: Color;
    selectColor?: (color: Color) => void;
    colorPeg?: (rowId: number, pegId: number) => void;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className, selectColor, colorPeg }) => {
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
            className={ className ? `peg ${className}` : 'peg' } 
            onClick={() => { 
                className && !colorPeg ? selectedColor(className) : colorSelectedPeg(rowId, pegId); 
            }}
        />
    );
};
  
export default Peg;
