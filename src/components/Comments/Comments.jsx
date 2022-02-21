import React from "react";
import { Form } from "react-bootstrap";

function CommentTextArea(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.text}
      </Form.Label>
      <Form.Control
        value={props.comment}
        as="textarea"
        rows={props.rows}
        maxlength={props.maxlength}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export default CommentTextArea;
