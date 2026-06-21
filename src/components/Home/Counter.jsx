import React, { useState } from "react";

const Counter = () => {
  const [num, setNum] = useState(3);

  const decrease = () => {
    if (num <= 0) {
      setNum(0);
    } else {
      setNum((prev) => prev - 1);
    }
    console.log(prev);
  };
  const increase = () => {
    setNum((prev) => prev + 1);
  };

  return (
    <div className="text-white. text-3xl py-40 pl-70 flex gap-8 ">
      <button onClick={decrease}>-</button>
      <span>{num}</span>
      <button onClick={increase}>+</button>
    </div>
  );
};

export default Counter;
