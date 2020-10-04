import React, { useEffect, useReducer } from "react";
import "./styles.css";
import _ from "lodash";
import shapes from "./shapes";
import { HotKeys } from "react-hotkeys";
import keyMap from "./keymap";

const DEFAULT_COLOR = "#fff";

const shuffleShapes = () => {
  let shapesBag = [];
  let remainingShapes = shapes;
  _.times(7, () => {
    const randomShape =
      remainingShapes[Math.floor(Math.random() * remainingShapes.length)];
    shapesBag.push(randomShape);
    remainingShapes = remainingShapes.filter((shape) => shape !== randomShape);
  });
  return shapesBag;
};

const initialState = () => {
  let shapesBag = shuffleShapes();
  const initialShape = shapesBag.shift();

  let grid = [];
  _.times(20, (j) => {
    let xGrids = [];
    _.times(10, (i) => {
      xGrids.push(DEFAULT_COLOR);
    });
    grid.push(xGrids);
  });

  initialShape.angle[0].forEach(({ x, y }) => {
    grid[y][x] = initialShape.color;
  });

  return {
    grid,
    currentAngle: 0,
    currentShape: initialShape,
    currentCoords: initialShape.angle[0],
    movement: { x: 0, y: 0 },
    shapesBag,
    gamePaused: false
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        ...action
      };
    case "PAUSE_GAME":
      return {
        ...state,
        gamePaused: !state.gamePaused
      };
    case "RESET_GAME":
      return {
        ...initialState()
      };
    default:
      throw new Error();
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    if (!state.gamePaused) {
      const interval = setInterval(move("down"), 1000);
      return () => clearInterval(interval);
    }
  });

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

  const handleLanded = (grid) => {
    let newLine = [];
    _.times(10, () => {
      newLine.push(DEFAULT_COLOR);
    });
    let newGrid = [];

    grid.forEach((row) => {
      const occupiedGrid = row.filter((color) => {
        return color !== DEFAULT_COLOR;
      });
      if (occupiedGrid.length === 10) {
        newGrid.splice(0, 0, newLine);
      } else {
        newGrid.push(row);
      }
    });

    let shapesBag = state.shapesBag;

    const newShape = shapesBag.shift();
    const newCoords = newShape.angle[0];
    const newMovement = { x: 0, y: 0 };

    if (isValidMove(newCoords, true)) {
      newGrid = updateGrid(newGrid, newCoords, newShape.color, false);
    }

    if (shapesBag.length === 0) {
      shapesBag = shuffleShapes();
    }

    dispatch({
      type: "UPDATE_GRID",
      grid: newGrid,
      currentCoords: newCoords,
      currentAngle: 0,
      movement: newMovement,
      currentShape: newShape,
      shapesBag
    });
  };

  const move = (direction) => (event) => {
    if (event) {
      event.preventDefault();
    }
    console.log(`MOVING ${direction}`);
    let newCoords = [];
    const currentCoords = state.currentCoords;
    let movement;
    switch (direction) {
      case "up":
        movement = { x: 0, y: -1 };
        break;
      case "down":
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
        grid: newGrid,
        currentCoords: newCoords,
        movement: newMovement
      });
      return;
    }
    if (direction === "down") {
      handleLanded(state.grid);
      return;
    }
  };

  const rotate = () => (event) => {
    event.preventDefault();
    let newAngle = state.currentAngle + 90;
    if (newAngle === 360) {
      newAngle = 0;
    }
    console.log(`Rotating to ${newAngle} degree`);
    let newCoords = state.currentShape.angle[newAngle].map(({ x, y }) => {
      return {
        x: x + state.movement.x,
        y: y + state.movement.y
      };
    });
    newCoords = wallKick(newCoords);
    if (isValidMove(newCoords, false)) {
      const newGrid = updateGrid(
        state.grid,
        newCoords,
        state.currentShape.color,
        true
      );
      dispatch({
        type: "UPDATE_GRID",
        grid: newGrid,
        currentCoords: newCoords,
        currentAngle: newAngle
      });
    }
  };

  const wallKick = (newCoords) => {
    let wallKickedCoords = newCoords;
    const movementArray = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ];

    movementArray.forEach(({ x: movementX, y: movementY }) => {
      if (isValidMove(wallKickedCoords, false)) {
        return;
      }

      wallKickedCoords = newCoords.map(({ x, y }) => {
        return {
          x: x + movementX,
          y: y + movementY
        };
      });
    });

    return wallKickedCoords;
  };

  const drop = () => (event) => {
    console.log("DROPPING");
    event.preventDefault();
    let validMove = true;
    let movementY = 0;
    let tempMovementY = movementY;
    let newCoords = state.currentCoords;
    let tempNewCoords = newCoords;

    while (validMove) {
      movementY = tempMovementY;
      newCoords = tempNewCoords;
      tempMovementY += 1;
      tempNewCoords = state.currentCoords.map(({ x, y }) => {
        return { x, y: y + movementY };
      });
      validMove = isValidMove(tempNewCoords, false);
    }

    const newGrid = updateGrid(
      state.grid,
      newCoords,
      state.currentShape.color,
      true
    );
    handleLanded(newGrid);
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

  const pauseGame = () => (event) => {
    event.preventDefault();
    dispatch({ type: "PAUSE_GAME" });
  };

  const resetGame = () => () => {
    dispatch({ type: "RESET_GAME" });
  };

  const inputHandlers = {
    MOVE_DOWN: move("down"),
    MOVE_UP: move("up"),
    MOVE_LEFT: move("left"),
    MOVE_RIGHT: move("right"),
    ROTATE: rotate(),
    PAUSE_GAME: pauseGame(),
    DROP: drop(),
    RESET_GAME: resetGame()
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

  return (
    <HotKeys allowChanges handlers={inputHandlers} keyMap={keyMap} root>
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
