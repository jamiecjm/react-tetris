import React from "react";
import "./styles.css";
import TitleScreenImage from "./assets/title-screen-image.jpg";

export default function Home() {
  return (
    <div className="Home">
      <h1>Tetris</h1>
      <img src={TitleScreenImage} alt="tetris" width="70%" />
      <div style={{ marginTop: "20px" }}>
        <a href="/game">Let's start</a>
      </div>
    </div>
  );
}
