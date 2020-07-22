import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#7ec8c0" />;
};

const MirroredLShape = () => {
  return (
    <div className="Shape">
      <div>
        <ColoredUnit />
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "left" }}>
        <ColoredUnit />
      </div>
      <div style={{ textAlign: "left" }}>
        <ColoredUnit />
      </div>
    </div>
  );
};

export default MirroredLShape;
