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
    angle: {
      0: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }],
      90: [{ x: 6, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
      180: [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
      270: [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 4, y: 2 }]
    }
  },
  {
    component: <LineShape />,
    width: 4,
    height: 1,
    color: "#6765c6",
    0: {
      offsets: [0, 1, 2, 3]
    },
    90: {
      offsets: [-8, 2, 12, 22]
    },
    180: {
      offsets: [10, 11, 12, 13]
    },
    270: {
      offsets: [-9, 1, 11, 21]
    }
  },
  {
    component: <MirroredLShape />,
    width: 2,
    height: 3,
    color: "#7ec8c0",
    0: {
      offsets: [1, 2, 11, 21],
      center: 2
    },
    90: {
      offsets: [10, 11, 12, 22],
      center: 1
    },
    180: {
      offsets: [1, 11, 21, 20],
      center: 1
    },
    270: {
      offsets: [0, 10, 11, 12],
      center: 2
    }
  },
  {
    component: <SShape />,
    width: 2,
    height: 3,
    color: "#80ca71",
    0: {
      offsets: [1, 11, 12, 22],
      center: 1
    },
    90: {
      offsets: [11, 12, 20, 21],
      center: 0
    },
    180: {
      offsets: [0, 10, 11, 21],
      center: 2
    },
    270: {
      offsets: [1, 2, 10, 11],
      center: 3
    }
  },
  {
    component: <SquareShape />,
    width: 2,
    height: 2,
    color: "#bf6dc5",
    0: {
      offsets: [1, 2, 11, 12]
    },
    90: {
      offsets: [1, 2, 11, 12]
    },
    180: {
      offsets: [1, 2, 11, 12]
    },
    270: {
      offsets: [1, 2, 11, 12]
    }
  },
  {
    component: <TShape />,
    width: 3,
    height: 2,
    color: "#ccca75",
    0: {
      offsets: [1, 10, 11, 12],
      center: 2
    },
    90: {
      offsets: [1, 11, 12, 21],
      center: 1
    },
    180: {
      offsets: [10, 11, 12, 21],
      center: 1
    },
    270: {
      offsets: [1, 10, 11, 21],
      center: 2
    }
  },
  {
    component: <ZShape />,
    width: 2,
    height: 3,
    color: "#bb6b6a",
    0: {
      offsets: [2, 11, 12, 21],
      center: 1
    },
    90: {
      offsets: [11, 12, 20, 21],
      center: 0
    },
    180: {
      offsets: [0, 10, 11, 21],
      center: 2
    },
    270: {
      offsets: [1, 2, 10, 11],
      center: 3
    }
  }
];
