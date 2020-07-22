import React from "react";
import "./styles.css";

const Unit = props => {
  const { color } = props;
  return <div className="Unit" style={{ backgroundColor: color }} />;
};

export default Unit;
