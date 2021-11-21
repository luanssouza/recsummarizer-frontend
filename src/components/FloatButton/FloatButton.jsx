import "./FloatButton.css";

import React from "react";
import { Button } from "react-bootstrap";

function vertPosition(num) {
  let position = num * 45;
  return { bottom: `${position}px` };
}

function FloatButton(props) {
  return (
    <Button
      onClick={props.buttonFunction}
      className="float-button"
      style={vertPosition(props.num)}
    >
      {props.title}
    </Button>
  );
}

export default FloatButton;
