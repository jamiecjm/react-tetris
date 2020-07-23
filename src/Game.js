import React, { useReducer } from "react";
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

const initialState = {
  currentShape: randomiseShape(),
  nextShapes: nextInLine,
  level: {
    number: 1,
    speed: 1500
  },
  coordinate: 4,
  angle: 0,
  position: "left"
};

function gameReducer(state, action) {
  const values = action.values;
  switch (action.type) {
    case "SHUFFLE_SHAPES":
      return {
        ...state,
        ...values
      };
    case "LEVEL_UP":
      const newLevel = {
        number: state.level.number + 1,
        speed: state.level.speed - 250
      };
      return {
        ...state,
        level: newLevel
      };
    case "CHANGE_POSITION":
      return {
        ...state,
        ...values
      };
    default:
      return state;
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleLanded = () => {
    const nextShape = nextInLine[0];
    nextInLine = state.nextShapes;
    nextInLine.shift();
    nextInLine.push(randomiseShape());
    dispatch({
      type: "SHUFFLE_SHAPES",
      values: {
        angle: initialState.angle,
        coordinate: initialState.coordinate,
        currentShape: nextShape,
        nextShapes: nextInLine
      }
    });
  };

  const NextShapes = () => {
    return state.nextShapes.map(shape => {
      return (
        <div>
          {shape.component}
          <br />
          <br />
        </div>
      );
    });
  };

  return (
    <div className="Game">
      {/* <div className="GameContainer">{grids}</div> */}
      <ShapeController
        angle={state.angle}
        coordinate={state.coordinate}
        position={state.position}
        dispatch={dispatch}
        handleLanded={handleLanded}
        shape={state.currentShape}
        speed={state.level.speed}
      />
      <div className="NextShapesContainer">
        <NextShapes />
      </div>
    </div>
  );
}
