import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./styles.css";

const ShapeController = props => {
  const { shape } = props;
  const [position, setPosition] = useState(4);

  const getCurrentPositions = () => {
    return shape.offsets.map(offset => {
      return position + offset;
    });
  };

  const Grids = () => {
    const currentPositions = getCurrentPositions();

    let grids = [];
    _.times(200, i => {
      if (currentPositions.includes(i + 1)) {
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

  // const [board, setBoard] = useState(generateGrids);
  // const rotate = () => {
  //   const newAngle = angle + 90;
  //   if (newAngle === 360) {
  //     setAngle(0);
  //   } else {
  //     setAngle(newAngle);
  //   }
  //   switch (newAngle) {
  //     case 90:
  //       setTransitionY(transitionY - UNIT * shape.height);
  //       return;
  //     case 180:
  //       setTransitionX(transitionX + UNIT * shape.width);
  //       return;
  //     case 270:
  //       setTransitionY(transitionY + UNIT * shape.height);
  //       return;
  //     case 360:
  //       setTransitionX(transitionX - UNIT * shape.width);
  //       return;
  //     default:
  //   }
  // };

  const move = direction => {
    const currentPositions = getCurrentPositions();
    let reachLeftWall, reachRightWall, reachBottom, reachTop;

    currentPositions.map(p => {
      if (p % 10 === 1) {
        reachLeftWall = true;
      }
      if (p % 10 === 0) {
        reachRightWall = true;
      }
      if (p - 190 > 0) {
        reachBottom = true;
      }
      if (p <= 10) {
        reachTop = true;
      }
      return true;
    });
    switch (direction) {
      case "up":
        if (!reachTop) {
          setPosition(position - 10);
        }
        return;
      case "down":
        if (!reachBottom) {
          setPosition(position + 10);
        }
        return;
      case "left":
        if (!reachLeftWall) {
          setPosition(position - 1);
        }
        return;
      case "right":
        if (!reachRightWall) {
          setPosition(position + 1);
        }
        return;
      default:
        return;
    }
  };

  const keyFunction = event => {
    switch (event.keyCode) {
      case 90:
        // rotate();
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
    <div className="GameContainer">
      <Grids />
    </div>
  );
};

export default ShapeController;
