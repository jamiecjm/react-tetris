import React, { useState } from "react";
import ShapeController from "./Shapes/ShapeController";
import { shapes } from "./Shapes/shapes";
import "./styles.css";

const randomiseShape = () => {
  const number = Math.floor(Math.random() * 7);
  return shapes[number];
};

let nextInLine = [
  randomiseShape(),
  randomiseShape(),
  randomiseShape(),
  randomiseShape()
];

export default function Game() {
  const [currentShape, setCurrentShape] = useState(randomiseShape());
  const [nextShapes, setNextShapes] = useState(nextInLine);

  const handleLanded = () => {
    setCurrentShape(nextInLine[0]);
    nextInLine.shift();
    nextInLine.push(randomiseShape());
    setNextShapes(nextInLine);
  };

  return (
    <div className="Game">
      {/* <div className="GameContainer">{grids}</div> */}
      <ShapeController shape={currentShape} onLanded={handleLanded} />
      <div className="NextShapesContainer">
        {nextShapes.map(shape => {
          return (
            <div>
              {shape.component}
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
