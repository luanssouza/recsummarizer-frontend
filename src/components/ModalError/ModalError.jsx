import React from "react";

// Bootstrap imports
import { Button, Modal } from "react-bootstrap";

const ModalError = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center ">
        Ops! Something went wrong... Please, try again!
        <br />
        If the problem persists, contact the researcher.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
