import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#80ca71" />;
};

const SShape = () => {
  return (
    <div className="Shape">
      <div style={{ textAlign: "left" }}>
        <ColoredUnit />
      </div>
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "right" }}>
        <ColoredUnit />
      </div>
    </div>
  );
};

export default SShape;
