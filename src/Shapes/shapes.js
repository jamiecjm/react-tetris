import React from "react";
import LShape from "./LShape";
import LineShape from "./LineShape";
import MirroredLShape from "./MirroredLShape";
import SShape from "./SShape";
import SquareShape from "./SquareShape";
import TShape from "./TShape";
import ZShape from "./ZShape";

export const shapes = [
  {
    component: <LShape />,
    width: 2,
    height: 3,
    color: "#d7ac3a",
    offsets: [1, 2, 12, 22]
  },
  {
    component: <LineShape />,
    width: 4,
    height: 1,
    color: "#6765c6",
    offsets: [0, 1, 2, 3]
  },
  {
    component: <MirroredLShape />,
    width: 2,
    height: 3,
    color: "#7ec8c0",
    offsets: [1, 2, 11, 21]
  },
  {
    component: <SShape />,
    width: 2,
    height: 3,
    color: "#80ca71",
    offsets: [1, 11, 12, 22]
  },
  {
    component: <SquareShape />,
    width: 2,
    height: 2,
    color: "#bf6dc5",
    offsets: [1, 2, 11, 12]
  },
  {
    component: <TShape />,
    width: 3,
    height: 2,
    color: "#ccca75",
    offsets: [1, 10, 11, 12]
  },
  {
    component: <ZShape />,
    width: 2,
    height: 3,
    color: "#bb6b6a",
    offsets: [2, 11, 12, 21]
  }
];
