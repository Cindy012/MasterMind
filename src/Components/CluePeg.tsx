import { Color } from "../ts/Color";

interface CluePegProps {
    className: Color;
}

const CluePeg:React.FC<CluePegProps> = ({ className }) => {
    return (
        <button className={ `peg clue peg__${className}` } />
    );
};

export default CluePeg;
