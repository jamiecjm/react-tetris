import React, { useEffect } from "react";
import _ from "lodash";
import "./styles.css";

const ShapeController = props => {
  const {
    angle,
    coordinate,
    dispatch,
    handleLanded,
    position,
    shape,
    speed
  } = props;

  const getCoordinates = (angle, coord) => {
    return shape[angle].offsets.map(offset => {
      return coord + offset;
    });
  };

  const Grids = () => {
    const currentCoordinates = getCoordinates(angle, coordinate);

    let grids = [];
    _.times(200, i => {
      if (currentCoordinates.includes(i + 1)) {
        grids.push(
          <div
            className="Grid"
            key={`row-${i}`}
            style={{ backgroundColor: shape.color }}
          />
        );
      } else {
        grids.push(<div className="Grid" key={`row-${i}`} />);
      }
    });

    return grids;
  };

  const positionInfo = (angle, coord) => {
    const currentCoordinates = getCoordinates(angle, coord);
    let reachLeftWall, reachRightWall, topInvalid, bottomInvalid;
    currentCoordinates.map(p => {
      if (p % 10 === 1) {
        reachLeftWall = true;
      }
      if (p % 10 === 0) {
        reachRightWall = true;
      }
      if (p > 200) {
        bottomInvalid = true;
      }
      if (p <= 0) {
        topInvalid = true;
      }
      return true;
    });

    return {
      horizontalInvalid: reachLeftWall && reachRightWall,
      topInvalid,
      bottomInvalid
    };
  };

  const calibratePosition = (angle, coord) => {
    let { horizontalInvalid, topInvalid, bottomInvalid } = positionInfo(
      angle,
      coord
    );
    let newCoordinate = coord;
    while (horizontalInvalid || topInvalid) {
      if (horizontalInvalid) {
        if (position === "left") {
          newCoordinate += 1;
        } else {
          newCoordinate -= 1;
        }
      } else {
        newCoordinate += 10;
      }
      const newInfo = positionInfo(angle, newCoordinate);
      horizontalInvalid = newInfo.horizontalInvalid;
      topInvalid = newInfo.topInvalid;
    }
    return {
      coord: newCoordinate,
      bottomInvalid
    };
  };

  const rotate = () => {
    let newAngle = angle + 90;
    newAngle = newAngle === 360 ? 0 : newAngle;

    let { coord, bottomInvalid } = calibratePosition(newAngle, coordinate);

    if (bottomInvalid) {
      handleLanded();
      return;
    }

    dispatch({
      type: "CHANGE_POSITION",
      values: {
        angle: newAngle,
        coordinate: coord
      }
    });
  };

  const move = direction => {
    let newCoordinate = coordinate;

    switch (direction) {
      // case "up":
      //   newCoordinate -= 10;
      //   break;
      case "down":
        newCoordinate += 10;
        break;
      case "left":
        newCoordinate -= 1;
        break;
      case "right":
        newCoordinate += 1;
        break;
      default:
        break;
    }

    let { coord, bottomInvalid } = calibratePosition(angle, newCoordinate);

    if (bottomInvalid) {
      handleLanded();
      return;
    }

    let remainder = coord % 10;

    dispatch({
      type: "CHANGE_POSITION",
      values: {
        coordinate: coord,
        position: remainder >= 0 && remainder <= 5 ? "left" : "right"
      }
    });
  };

  const keyFunction = event => {
    switch (event.keyCode) {
      case 90:
        rotate();
        break;
      case 37:
        move("left");
        break;
      case 38:
        move("up");
        break;
      case 39:
        move("right");
        break;
      case 40:
        move("down");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);

    // const dropInterval = setInterval(() => {
    //   move("down");
    // }, speed);

    return () => {
      document.removeEventListener("keydown", keyFunction, false);
      // clearInterval(dropInterval);
    };
  });

  return (
    <>
      <div className="GameContainer">
        <Grids />
      </div>
    </>
  );
};

export default ShapeController;
