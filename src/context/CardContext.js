import { createContext, useState, useContext } from 'react';

class Stack {
  constructor() {
    this.arr = [];
  }
  push(item) {
    this.arr.push(item);
  }
  pop() {
    return this.arr.pop();
  }
  peek() {
    return this.arr[this.arr.length - 1];
  }
  size() {
    return this.arr.length;
  }
  isEmpty() {
    return this.arr.length === 0;
  }
}

const CardStyles = {
  phase1: {
    title: 'Welcome',
    cardGeometry: {
      width:'650px',
      height: '700px',
      marginTop: '6%'
    }
  },
  phase2: {
    title: 'Login',
    cardGeometry: {
      width: '450px',
      height: '500px',
      marginTop: '12%'
    }
  }
}

// Create a context
export const CardContext = createContext();

export const CardContextProvider = ( {children } ) => {
  const [phase, setPhase] = useState(1);
  return (
    <CardContext.Provider value={{ phase, setPhase }}>
      {children} 
    </CardContext.Provider>
  );
};

const isRunning = (phase) => {
  if (phase <= 0) {
      return true;
  }
  return (phase & (phase - 1)) !== 0;
}

const useStackableCard = () => {
  const ANIMATION_DURATION = 500;
  const {phase, setPhase} = useContext(CardContext);
  if (CardContext.history === undefined) 
    CardContext.history = new Stack();
  
  const switchPhase = (value, rewind = false) => {
    let card = document.querySelector("#card");
    if (card === undefined) {
      setPhase(value);
      return;
    }

    let container = card.firstChild;
    container.animate(
      rewind === true ? [
        { transform: 'translateX(0%)', opacity:'1' },
        { transform: 'translateX(+100%)', opacity:'0' }
      ] : [
        { transform: 'translateX(0%)', opacity:'1' },
        { transform: 'translateX(-100%)', opacity:'0' }
      ],
    {
      duration: ANIMATION_DURATION, fill: 'forwards', easing: 'ease'
    });
    card.animate([
      { },
      CardStyles['phase'+value].cardGeometry
    ], {
      duration: ANIMATION_DURATION, fill: 'forwards', easing: 'ease'
    });
    
    setPhase(phase | value);
    setTimeout(() => {
      let sibling = container.nextSibling;
      if (sibling === null) sibling = container.previousSibling;
      if (sibling === null) return;
      console.log([container.nextSibling, container.previousSibling, sibling])
      sibling.animate(
        rewind === true ? [
          { transform: 'translateX(-100%)', opacity:'0' },
          { transform: 'translateX(0%)', opacity:'1' }
        ] : [
          { transform: 'translateX(+100%)', opacity:'0' },
          { transform: 'translateX(0%)', opacity:'1' }
        ],
      {
        duration: ANIMATION_DURATION, fill: 'forwards', easing: 'ease'
      });
    }, 0);
    setTimeout(() => setPhase(value), ANIMATION_DURATION);
  };
  
  const setStackablePhase = (value) => {
    if (isRunning(phase)) return;
    CardContext.history.push(phase);
    switchPhase(value);
  };

  const rewind = () => {
    if (isRunning(phase)) return;
    switchPhase(CardContext.history.pop(), true);
  };

  return { phase:phase,
           setPhase:setStackablePhase,
           rewind: rewind};
};

export const useCard = useStackableCard;
