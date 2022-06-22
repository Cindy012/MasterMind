import { Color } from "../Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className?: Color;
    onClick?: (color: Color) => void;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className, onClick }) => {
    const clickBoardPeg = (rowId?: number, pegId?: number) => {
        if (!rowId && !pegId && (typeof rowId === 'undefined' || typeof pegId === 'undefined')) {
            return;
        }
        console.log('Hi');
    };

    const selectColor = (color?: Color) => {
		if (!color || typeof color === 'undefined' || (!onClick || typeof color === 'undefined')) {
            return;
        }
        onClick(color);
    };

    return (
        <button 
            className={ className ? `peg ${className}` : 'peg' } 
            onClick={() => { 
                className ? selectColor(className) : clickBoardPeg(rowId, pegId); 
            }}
        >
        </button>
    );
};
  
export default Peg;
