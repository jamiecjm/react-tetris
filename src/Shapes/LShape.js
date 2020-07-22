import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#d7ac3a" />;
};

const LShape = () => {
  return (
    <div className="Shape">
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "right" }}>
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "right" }}>
        <ColoredUnit />
      </div>
    </div>
  );
};

export default LShape;
