import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#bf6dc5" />;
};

const SquareShape = () => {
  return (
    <div className="Shape">
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
    </div>
  );
};

export default SquareShape;
