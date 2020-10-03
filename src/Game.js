import React, { useEffect, useReducer } from "react";
import "./styles.css";
import _ from "lodash";
import shapes from "./shapes";
import { HotKeys } from "react-hotkeys";
import keyMap from "./keymap";

const DEFAULT_COLOR = "#fff";

const randomShape = () => {
  return shapes[Math.floor(Math.random() * 7)];
};

const initialShape = randomShape();

const initialGrid = () => {
  let grids = [];
  _.times(20, (j) => {
    let xGrids = [];
    _.times(10, (i) => {
      const shape = initialShape.angle[0].find(({ x, y }) => {
        return i === x && j === y;
      });
      if (shape) {
        xGrids.push(initialShape.color);
      } else {
        xGrids.push(DEFAULT_COLOR);
      }
    });
    grids.push(xGrids);
  });
  return grids;
};

const initialState = {
  grid: initialGrid(),
  currentAngle: 0,
  currentShape: initialShape,
  currentCoords: initialShape.angle[0],
  movement: { x: 0, y: 0 }
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        grid: action.newGrid,
        currentCoords: action.newCoords,
        currentAngle: action.newAngle,
        movement: action.newMovement || state.movement,
        currentShape: action.newShape || state.currentShape
      };
    default:
      throw new Error();
  }
}

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("STATE", state);

  const isValidMove = (coordinates, isNewShape) => {
    const occupied = coordinates.find(({ x, y }) => {
      try {
        let isSelf;
        if (isNewShape) {
          isSelf = false;
        } else {
          isSelf = state.currentCoords.find(({ x: currentX, y: currentY }) => {
            return currentX === x && currentY === y;
          });
        }

        if (state.grid[y][x] !== DEFAULT_COLOR && !isSelf) {
          return true;
        }
        return false;
      } catch {
        return true;
      }
    });
    if (occupied) {
      return false;
    }
    return true;
  };

  const handleLanded = () => {
    let newLine = [];
    _.times(10, () => {
      newLine.push(DEFAULT_COLOR);
    });
    let newGrid = [];

    state.grid.forEach((row) => {
      const occupiedGrid = row.filter((color) => {
        return color !== DEFAULT_COLOR;
      });
      if (occupiedGrid.length === 10) {
        newGrid.splice(0, 0, newLine);
      } else {
        newGrid.push(row);
      }
    });

    const newShape = randomShape();
    const newCoords = newShape.angle[0];
    const newMovement = { x: 0, y: 0 };
    if (isValidMove(newCoords, true)) {
      newGrid = updateGrid(newGrid, newCoords, newShape.color, false);
    }

    dispatch({
      type: "UPDATE_GRID",
      newGrid,
      newCoords,
      newAngle: 0,
      newMovement,
      newShape
    });
  };

  const move = (direction) => () => {
    let newCoords = [];
    const currentCoords = state.currentCoords;
    let movement;
    switch (direction) {
      case "up":
        movement = { x: 0, y: -1 };
        break;
      case "down":
        console.log("MOVING DOWN");
        movement = { x: 0, y: 1 };
        break;
      case "left":
        movement = { x: -1, y: 0 };
        break;
      case "right":
        movement = { x: 1, y: 0 };
        break;
      default:
        break;
    }
    newCoords = currentCoords.map(({ x, y }) => {
      return { x: x + movement.x, y: y + movement.y };
    });
    if (isValidMove(newCoords, false)) {
      const newGrid = updateGrid(
        state.grid,
        newCoords,
        state.currentShape.color,
        true
      );
      const newMovement = {
        x: state.movement.x + movement.x,
        y: state.movement.y + movement.y
      };
      dispatch({
        type: "UPDATE_GRID",
        newGrid,
        newCoords,
        newAngle: state.currentAngle,
        newMovement
      });
      return;
    }
    if (direction === "down") {
      handleLanded();
      return;
    }
  };

  const rotate = () => () => {
    let newAngle = state.currentAngle + 90;
    if (newAngle === 360) {
      newAngle = 0;
    }
    const newCoords = state.currentShape.angle[newAngle].map(({ x, y }) => {
      return {
        x: x + state.movement.x,
        y: y + state.movement.y
      };
    });
    if (isValidMove(newCoords, false)) {
      const newGrid = updateGrid(
        state.grid,
        newCoords,
        state.currentShape.color,
        true
      );
      dispatch({
        type: "UPDATE_GRID",
        newGrid,
        newCoords,
        newAngle
      });
    }
  };

  const updateGrid = (grid, newCoords, color, isNewPosition) => {
    let newGrid = grid;
    const currentCoords = state.currentCoords;
    if (isNewPosition) {
      currentCoords.forEach(({ x, y }) => {
        newGrid[y][x] = DEFAULT_COLOR;
      });
    }
    newCoords.forEach(({ x, y }) => {
      newGrid[y][x] = color;
    });

    return newGrid;
  };

  const Grid = ({ grid }) => {
    return grid.map((row, x) => {
      return row.map((color, y) => {
        return (
          <div
            className="Grid"
            style={{ backgroundColor: color }}
            key={`grid-${x}-${y}`}
          />
        );
      });
    });
  };

  const inputHandlers = {
    MOVE_DOWN: move("down"),
    MOVE_UP: move("up"),
    MOVE_LEFT: move("left"),
    MOVE_RIGHT: move("right"),
    ROTATE: rotate()
  };

  // useEffect(() => {
  //   const interval = setInterval(move("down"), 1000);
  //   return () => clearInterval(interval);
  // });

  return (
    <HotKeys allowChanges handlers={inputHandlers} keyMap={keyMap}>
      <div className="Game">
        <div className="GameContainer">
          <Grid grid={state.grid} />
        </div>
        <div className="NextShapeContainer"></div>
      </div>
    </HotKeys>
  );
};

export default Game;
