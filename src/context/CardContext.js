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


// Create a context
export const CardContext = createContext();

export const CardContextProvider = ( {children } ) => {
  const [phase, setPhase] = useState(0);
  return (
    <CardContext.Provider value={{ phase, setPhase }}>
      {children}
    </CardContext.Provider>
  );
};


const useStackableCard = () => {
  const {phase, setPhase} = useContext(CardContext);
  if (CardContext.history === undefined) 
    CardContext.history = new Stack();
  
  const setStackablePhase = (el) => {
    CardContext.history.push(phase);
    console.log(CardContext.history)
    setPhase(el);
  };

  const rewind = () => {
    setPhase(CardContext.history.pop());
  };

  console.log(useContext(CardContext))
  return { phase:phase,
           setPhase:setStackablePhase,
           rewind: rewind};
};

export const useCard = useStackableCard;
