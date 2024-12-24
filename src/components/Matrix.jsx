import React, { useState } from 'react';
import './matrix.css';

const Matrix = () => {
  const [clickOrder, setClickOrder] = useState([]); 
  const [finalState, setFinalState] = useState(false); 
  const [animationOrder, setAnimationOrder] = useState([]); 
  const handleClick = (index) => {
    if (!clickOrder.includes(index) && !finalState) {
      const updatedOrder = [...clickOrder, index];
      setClickOrder(updatedOrder);

      if (updatedOrder.length === 9) {
        triggerAnimation(updatedOrder);
      }
    }
  };

  const triggerAnimation = (order) => {
    let delay = 0;
    order.forEach((index, i) => {
      setTimeout(() => {
        setAnimationOrder((prev) => [...prev, index]);
        if (i === order.length - 1) {
          setFinalState(true); 
        }
      }, delay);
      delay += 200; 
    });
  };

  const default_app = ()=>{
    setClickOrder([])
    setFinalState(false)
    setAnimationOrder([])
  }

  return (<>
    <div className="box">
      {[...Array(9)].map((_, index) => {
        const clickPosition = clickOrder.indexOf(index) + 1; 
        const isAnimating = animationOrder.includes(index);
        const backgroundColor = finalState
          ? '#FF6B35' 
          : isAnimating
          ? '#FF6B35' 
          : clickOrder.includes(index)
          ? '#32CD32' 
          : '#0984E3'; 

        return (
            <>
          <div
            key={index}
            className="box-in"
            onClick={() => handleClick(index)}
            style={{ backgroundColor }}
          >
            { clickPosition > 0 ? clickPosition : ''}
          </div>
          
          </>
        );
      })}

    </div>
    <div >
            <button className='reset' onClick={default_app}>Reset</button>
      </div>
      </>
  );
};

export default Matrix;
