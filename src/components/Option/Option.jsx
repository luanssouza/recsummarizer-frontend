import "./Option.css";

import React from "react";

// Bootstrap imports
import { Col, Form, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

const tooltipLabel = (index, labels) => (labels ? labels[index - 1] : index);

function Option(props) {
  return (
    <Form.Group controlId={props.controlId} as={Row}>
      <Col md="4" className="d-flex align-items-center">
        <Form.Label>{props.label}</Form.Label>
      </Col>
      <Col md="8">
        <div class="ticks">
          {props.ticks
            ? props.ticks.map((item, index) => (
                <span class="tick" key={index}>
                  {item}
                </span>
              ))
            : null}
        </div>
        <RangeSlider
          value={props.value}
          min={1}
          max={5}
          tooltipLabel={() => tooltipLabel(props.value, props.labels)}
          onChange={props.onChange}
        />
      </Col>
    </Form.Group>
  );
}

export default Option;
