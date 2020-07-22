import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#6765c6" />;
};

const LineShape = () => {
  return (
    <div className="Shape">
      <ColoredUnit />
      <ColoredUnit />
      <ColoredUnit />
      <ColoredUnit />
    </div>
  );
};

export default LineShape;
