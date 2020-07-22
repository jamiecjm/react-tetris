import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const ShapeController = props => {
  const { shape } = props;

  const [angle, setAngle] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const rotate = () => {
    setAngle(angle + 90);
  };

  const move = direction => {
    switch (direction) {
      case "left":
        setXPosition(xPosition - 35);
        return;
      case "right":
        setXPosition(xPosition + 35);
        return;
      case "down":
        setYPosition(yPosition + 35);
        return;
      case "up":
        setYPosition(yPosition - 35);
        return;
      default:
        return;
    }
  };

  const keyFunction = event => {
    switch (event.keyCode) {
      case 90:
        rotate();
        return;
      case 37:
        move("left");
        return;
      case 38:
        move("up");
        return;
      case 39:
        move("right");
        return;
      case 40:
        move("down");
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);

    return () => {
      document.removeEventListener("keydown", keyFunction, false);
    };
  });

  return (
    <div
      className="Shape"
      style={{
        transform: `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`
      }}
    >
      {shape}
    </div>
  );
};

export default ShapeController;
