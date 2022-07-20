import { Color } from "./Color";

interface CluePegProps {
    className?: Color;
}

const CluePeg:React.FC<CluePegProps> = ({ className }) => {
    return (
        <button className={ className ? `peg clue ${className}` : 'peg clue' } />
    );
};
  
export default CluePeg;
