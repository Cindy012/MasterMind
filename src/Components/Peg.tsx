interface PegProps {
    rowId: number;
    PegId: number;
}

const Peg:React.FC<PegProps> = ({ rowId, PegId }) => {
    const click = (rowId: number, PegId: number) => {
        console.log('Hi');
    };

    return (
        <button className='peg' onClick={() => { click(rowId, PegId); } }></button>
    );
};
  
export default Peg;
