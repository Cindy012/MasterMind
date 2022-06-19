interface PegProps {
    rowId: number;
    pegId: number;
}

const Peg:React.FC<PegProps> = ({ rowId, pegId }) => {
    const click = (rowId: number, pegId: number) => {
        console.log('Hi');
    };

    return (
        <button className='peg' onClick={() => { click(rowId, pegId); } }></button>
    );
};
  
export default Peg;
