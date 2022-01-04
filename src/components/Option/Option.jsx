import React from 'react';

// Bootstrap imports
import { Form } from 'react-bootstrap';

function Option(props) {
    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>
              {props.label}
            </Form.Label>
            <Form.Control
              as="select"
              value={props.value}
              onChange={props.onChange}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
    );
}

export default Option;