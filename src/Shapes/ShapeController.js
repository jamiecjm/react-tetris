import React, { useEffect } from "react";
import "./styles.css";

const ShapeController = props => {
  const {
    angle,
    currentShape,
    dispatch,
    grid,
    gridStatus,
    handleLanded,
    updateGridStatus
  } = props;

  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);

    return () => {
      document.removeEventListener("keydown", keyFunction, false);
    };
  });

  const adjustPosition = newAngle => {
    // let xLeft, xRight, yTop, yBottom;

    // const xS = currentShape.angle[newAngle].map(({ x }) => {
    //   return x;
    // });

    // const yS = currentShape.angle[newAngle].map(({ y }) => {
    //   return y;
    // });

    // xLeft = Math.min(...xS);
    // xRight = Math.min(...xS);
    // yTop = Math.min(...yS);
    // yBottom = Math.max(...yS);

    let xCoords = currentShape.angle[newAngle].find(({ x }) => {
      return x < 0 || x > 9;
    });
    let yCoords = currentShape.angle[newAngle].find(({ y }) => {
      return y < 0 || y > 19;
    });

    if (xCoords === undefined && yCoords === undefined) {
      return currentShape.angle;
    }

    let xOffset = 0;
    let yOffset = 0;
    let newCoords = {};

    if (xCoords && xCoords.x < 0) {
      xOffset = 0 - xCoords.x;
    } else if (xCoords && xCoords.x > 9) {
      xOffset = 9 - xCoords.x;
    }

    if (yCoords && yCoords.y < 0) {
      yOffset = 0 - yCoords.y;
    } else if (yCoords && yCoords.y > 19) {
      yOffset = 19 - yCoords.y;
    }

    [0, 90, 180, 270].map(key => {
      newCoords[key] = currentShape.angle[key].map(({ x, y }) => {
        x += xOffset;
        y += yOffset;
        return {
          x,
          y
        };
      });
      return true;
    });

    return newCoords;
  };

  const rotate = () => {
    let newAngle = angle + 90;
    newAngle = newAngle === 360 ? 0 : newAngle;

    const newCoords = adjustPosition(newAngle);

    const newGridStatus = updateGridStatus(
      gridStatus,
      currentShape.angle[angle],
      newCoords[newAngle]
    );

    return {
      newGridStatus,
      newAngle,
      newCoords
    };
  };

  const move = direction => {
    let newCoords = {};
    let touchedBottom = false;
    let invalid = false;

    [0, 90, 180, 270].map(key => {
      newCoords[key] = currentShape.angle[key].map(({ x, y }) => {
        switch (direction) {
          case "up":
            break;
          case "down":
            key === angle
              ? y < 19
                ? (y += 1)
                : (touchedBottom = true)
              : (y += 1);
            break;
          case "left":
            key === angle ? (x > 0 ? (x -= 1) : (invalid = true)) : (x -= 1);
            break;
          case "right":
            key === angle ? (x < 9 ? (x += 1) : (invalid = true)) : (x += 1);
            break;
          default:
            break;
        }
        return {
          x,
          y
        };
      });
      return true;
    });

    if (invalid) {
      return;
    }

    if (touchedBottom) {
      handleLanded();
      return;
    }

    const newGridStatus = updateGridStatus(
      gridStatus,
      currentShape.angle[angle],
      newCoords[angle]
    );

    return {
      newGridStatus,
      newAngle: angle,
      newCoords
    };
  };
  const keyFunction = event => {
    let props;
    switch (event.keyCode) {
      case 90:
        props = rotate();
        break;
      case 37:
        props = move("left");
        break;
      case 38:
        props = move("up");
        break;
      case 39:
        props = move("right");
        break;
      case 40:
        props = move("down");
        break;
      default:
        break;
    }

    const { newGridStatus, newAngle, newCoords } = props;

    dispatch({
      type: "UPDATE_GRID",
      values: {
        gridStatus: newGridStatus,
        angle: newAngle,
        currentShape: {
          ...currentShape,
          angle: newCoords
        }
      }
    });
  };

  return <div className="GameContainer">{grid}</div>;
};

export default ShapeController;
