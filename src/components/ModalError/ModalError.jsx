import React from "react";

// Bootstrap imports
import ModalMessage from "../ModalMessage/ModalMessage";

const ModalError = (props) => {
  let title = "Error!";
  let text = (
    <>
      Ops! Something went wrong... Please, try again!
      <br />
      If the problem persists, contact the researcher.
    </>
  );

  return (
    <ModalMessage
      show={props.show}
      onHide={props.onHide}
      title={title}
      text={text}
    />
  );
};

export default ModalError;
