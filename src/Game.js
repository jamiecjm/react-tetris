import React, { useReducer } from "react";
import _ from "lodash";
import ShapeController from "./Shapes/ShapeController";
import { shapes } from "./Shapes/shapes";
import "./styles.css";

const randomiseShape = () => {
  const number = Math.floor(Math.random() * 1);
  return shapes[number];
};

let currentShape = randomiseShape();

let nextShapes = [
  randomiseShape(),
  randomiseShape(),
  randomiseShape(),
  randomiseShape()
];

let gridStatus = [];

_.times(20, i => {
  let array = [];
  _.times(10, y => {
    array.push("#ffffff");
  });
  gridStatus.push(array);
});

currentShape.angle[0].map(({ x, y }) => {
  return (gridStatus[y][x] = currentShape.color);
});

const initialState = {
  gridStatus,
  currentShape,
  nextShapes,
  angle: 0
};

function gameReducer(state, action) {
  const values = action.values;
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        gridStatus: values.gridStatus,
        currentShape: values.currentShape || state.currentShape,
        angle: Number.isInteger(values.angle) ? values.angle : state.angle
      };
    case "HANDLE_LANDED":
      return {
        ...state,
        gridStatus: values.gridStatus,
        currentShape: values.currentShape,
        nextShapes: values.nextShapes,
        angle: initialState.angle
      };
    default:
      return state;
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  console.log("state", { state });

  const handleLanded = () => {
    nextShapes = state.nextShapes;
    currentShape = nextShapes[0];
    nextShapes.shift();
    nextShapes.push(randomiseShape());

    gridStatus = updateGridStatus(
      state.gridStatus,
      currentShape.angle[0],
      currentShape.angle[0]
    );

    dispatch({
      type: "HANDLE_LANDED",
      values: {
        gridStatus,
        currentShape,
        nextShapes
      }
    });
  };

  const updateGridStatus = (
    gridStatus,
    previousAngleCoords,
    newAngleCoords
  ) => {
    let newGridStatus = gridStatus;

    previousAngleCoords.map(({ x, y }) => {
      return (newGridStatus[y][x] = "#ffffff");
    });

    newAngleCoords.map(({ x, y }) => {
      return (newGridStatus[y][x] = state.currentShape.color);
    });

    return newGridStatus;
  };

  let grid = [];

  _.times(20, i => {
    let array = [];
    _.times(10, y => {
      array.push(
        <div
          className="Grid"
          key={`${i} ${y}`}
          style={{ backgroundColor: state.gridStatus[i][y] }}
        >
          {y} {i}
        </div>
      );
    });
    grid.push(array);
  });

  const NextShapes = () => {
    return state.nextShapes.map((shape, index) => {
      return (
        <div key={`next-shape-${index}`}>
          {shape.component}
          <br />
          <br />
        </div>
      );
    });
  };

  return (
    <div className="Game">
      <ShapeController
        angle={state.angle}
        currentShape={state.currentShape}
        dispatch={dispatch}
        grid={grid}
        gridStatus={state.gridStatus}
        handleLanded={handleLanded}
        updateGridStatus={updateGridStatus}
      />
      <div className="NextShapesContainer">
        <NextShapes />
      </div>
    </div>
  );
}
