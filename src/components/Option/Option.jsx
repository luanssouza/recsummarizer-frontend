import "./Option.css";

import React from "react";

// Bootstrap imports
import { Col, Form, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

const tooltipLabel = (index) => {
  let labels = [
    "Strongly disagree",
    "Disagree",
    "I don't know",
    "Agree",
    "Strongly agree",
  ];
  return labels[index - 1];
};

function Option(props) {
  return (
    <Form.Group controlId={props.controlId} as={Row}>
      <Col md="4" className="d-flex align-items-center">
        <Form.Label>{props.label}</Form.Label>
      </Col>
      <Col md="8">
      <div class="ticks">
          <span class="tick">Disagree</span>
          <span class="tick"></span>
          <span class="tick">Neutral</span>
          <span class="tick"></span>
          <span class="tick">Agree</span>
        </div>
        <RangeSlider
          value={props.value}
          min={1}
          max={5}
          tooltipLabel={tooltipLabel}
          onChange={props.onChange}
        />
      </Col>
    </Form.Group>
  );
}

export default Option;
