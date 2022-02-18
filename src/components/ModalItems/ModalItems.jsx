import React from "react";

// Bootstrap imports
import { Button, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";

const ModalItems = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {Object.keys(props.items).map((key, index) => {
            let item = props.items[key];
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs sm md={2}>
                    <Image src={item.poster} fluid />
                  </Col>
                  <Col xs sm md={6} className="my-auto">
                    {item.title}
                  </Col>
                  <Col xs sm md={4} className="my-auto">
                    <Button
                      variant="danger"
                      onClick={() => props.onDelete(key)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItems;
