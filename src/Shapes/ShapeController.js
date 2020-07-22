import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./styles.css";

const ShapeController = props => {
  const { shape } = props;
  const [position, setPosition] = useState(4);
  const [angle, setAngle] = useState(0);

  const getCurrentPositions = () => {
    return shape[angle].offsets.map(offset => {
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

  const getPositionsInfo = () => {
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

    return {
      reachLeftWall,
      reachRightWall,
      reachBottom,
      reachTop
    };
  };

  const rotate = () => {
    if (shape.width === shape.height) {
      return;
    }

    const newAngle = angle + 90;
    if (newAngle === 360) {
      setAngle(0);
    } else {
      setAngle(newAngle);
    }

    if (shape.width === 4) {
      const info = getPositionsInfo();
      if (info.reachLeftWall) {
        if (angle === 90) {
          setPosition(position + 2);
        }
        if (angle === 270) {
          setPosition(position + 1);
        }
      }
      if (info.reachRightWall) {
        if (angle === 90) {
          setPosition(position - 1);
        }
        if (angle === 270) {
          setPosition(position - 2);
        }
      }
      if (info.reachBottom) {
        if (angle === 0) {
          setPosition(position - 20);
        }
        if (angle === 180) {
          setPosition(position - 10);
        }
      }
      if (info.reachTop) {
        if (angle === 0) {
          setPosition(position + 10);
        }
        if (angle === 180) {
          setPosition(position + 20);
        }
      }
      return;
    }

    const currentPositions = getCurrentPositions();
    if (currentPositions[shape[angle].center] % 10 === 1) {
      setPosition(position + 1);
    }
    if (currentPositions[shape[angle].center] % 10 === 0) {
      setPosition(position - 1);
    }
    if (currentPositions[shape[angle].center] <= 10) {
      setPosition(position + 10);
    }
    if (currentPositions[shape[angle].center] - 190 > 0) {
      setPosition(position - 10);
    }
  };

  const move = direction => {
    const info = getPositionsInfo();

    switch (direction) {
      case "up":
        if (!info.reachTop) {
          setPosition(position - 10);
        }
        return;
      case "down":
        if (!info.reachBottom) {
          setPosition(position + 10);
        }
        return;
      case "left":
        if (!info.reachLeftWall) {
          setPosition(position - 1);
        }
        return;
      case "right":
        if (!info.reachRightWall) {
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
    <>
      <div className="GameContainer">
        <Grids />
      </div>
    </>
  );
};

export default ShapeController;
