import { Color } from "../Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className?: Color;
    selectColor?: (color: Color) => void;
    colorPeg?: (rowId: number, pegId: number) => void;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className, selectColor, colorPeg }) => {
    const colorSelectedPeg = (rowId?: number, pegId?: number) => {
        if ((!rowId || typeof rowId === 'undefined') || (!pegId || typeof pegId === 'undefined') || (!colorPeg || typeof colorPeg === 'undefined')) {
            return;
        }
        colorPeg(rowId, pegId);
    };

    const selectedColor = (color?: Color) => {
		if (!color || typeof color === 'undefined' || (!selectColor || typeof color === 'undefined')) {
            return;
        }
        selectColor(color);
    };

    return (
        <button 
            className={ className ? `peg ${className}` : 'peg' } 
            onClick={() => { 
                className ? selectedColor(className) : colorSelectedPeg(rowId, pegId); 
            }}
        >
        </button>
    );
};
  
export default Peg;
