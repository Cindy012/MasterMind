import { Color } from "../Color";

interface PegProps {
    rowId?: number;
    pegId?: number;
    className?: Color;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId, className }) => {
    const clickBoardPeg = (rowId?: number, pegId?: number) => {
        if (!rowId && !pegId && (typeof rowId === 'undefined' || typeof pegId === 'undefined')) {
            return;
        }
        console.log('Hi');
    };

    const selectColor = (color?: string) => {
        if (!color && typeof color === 'undefined') {
            return;
        }
        console.log(color);
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
