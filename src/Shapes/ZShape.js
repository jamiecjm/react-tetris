import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#bb6b6a" />;
};

const ZShape = () => {
  return (
    <div className="Shape">
      <div style={{ textAlign: "right" }}>
        <ColoredUnit />
      </div>
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "left" }}>
        <ColoredUnit />
      </div>
    </div>
  );
};

export default ZShape;
