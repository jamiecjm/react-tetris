import React from "react";
import LShape from "./Shapes/LShape";
import LineShape from "./Shapes/LineShape";
import MirroredLShape from "./Shapes/MirroredLShape";
import SShape from "./Shapes/SShape";
import SquareShape from "./Shapes/SquareShape";
import TShape from "./Shapes/TShape";
import ZShape from "./Shapes/ZShape";
import "./styles.css";

export default function Home() {
  return (
    <div className="Home">
      <h1>Tetris</h1>
      <div className="display">
        <MirroredLShape />
      </div>
      <div className="display">
        <ZShape />
      </div>
      <div className="display">
        <LShape />
      </div>
      <div className="display">
        <SShape />
      </div>
      <br />
      <div className="display">
        <LineShape />
      </div>
      <div className="display">
        <SquareShape />
      </div>
      <div className="display">
        <TShape />
      </div>
      <div style={{ marginTop: "50px" }}>
        <a href="/game">Let's start</a>
      </div>
    </div>
  );
}
