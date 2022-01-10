import "./FloatButton.css";

import React from "react";

// Bootstrap imports
import { Button } from "react-bootstrap";

const vertPosition = (num) => {
  let position = num * 50 + 20;
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
