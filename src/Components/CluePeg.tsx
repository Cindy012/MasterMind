import { Color } from "./Color";

interface CluePegProps {
    className?: Color;
}

const CluePeg:React.FC<CluePegProps> = (className) => {
    return (
        <button className={ className ? `cluepeg ${className}` : 'cluePeg' } />
    );
};
  
export default CluePeg;
