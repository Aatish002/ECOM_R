import React, { useRef, useState } from "react";

const Ref = () => {
  const [count, setCount] = useState(1);
  const age = useRef(0);
  console.log("hello");

  console.log("State Count:", count);
  console.log("Ref Object:", age);

  return (
    <div style={{ padding: "40px" }}>
      <button
        style={{ padding: "10px", marginBottom: "20px", display: "block" }}
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        State Count (Triggers Render): {count}
      </button>

      <p
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          cursor: "pointer",
          display: "inline-block",
        }}
        onClick={() => {
          age.current = age.current + 1;
          console.log("Internal Ref Value:", age.current);
        }}
      >
        Ref Age: {age.current} (Click to increment internally)
      </p>

      <p style={{ fontSize: "14px", color: "gray", marginTop: "10px" }}>
        Note: The number in the box above only changes visually when you click
        the
        <b> State Count</b> button, because refs don't trigger re-renders.
      </p>
    </div>
  );
};

export default Ref;
