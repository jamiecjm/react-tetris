import React from "react";
import Unit from "./Unit";
import "./styles.css";

const ColoredUnit = () => {
  return <Unit color="#ccca75" />;
};

const TShape = () => {
  return (
    <div className="Shape">
      <div>
        <ColoredUnit />
      </div>
      <div>
        <ColoredUnit />
        <ColoredUnit />
        <ColoredUnit />
      </div>
    </div>
  );
};

export default TShape;
