import "./FloatButton.css";

import React from "react";
import { Button } from "react-bootstrap";

const vertPosition = (num) => {
  let position = num * 45;
  return { bottom: `${position}px` };
};

const FloatButton = (props) => {
  return (
    <Button
      onClick={props.buttonFunction}
      className="float-button"
      style={vertPosition(props.num)}
      disabled={props.disabled}
    >
      {props.title}
    </Button>
  );
};

export default FloatButton;
