const Pin = () => {
    const click = () => {
        console.log('Hi');
    }

    return (
        <button className='pin' onClick={() => { click() } }></button>
    );
  }
  
export default Pin;