import React from "react";

// Bootstrap imports
import { Card } from "react-bootstrap";

// React Stars
import ReactStars from "react-rating-stars-component";

const CardItem = (props) => {
  return (
    <Card>
      <Card.Header as="h5">{props.item.title}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={props.item.poster} />
        <Card.Text>{props.item.text}</Card.Text>
        <ReactStars
          count={5}
          size={30}
          activeColor="#ffd700"
          onChange={(rate) => props.onRate(props.index, rate)}
        />
        {/* <Button variant="primary">Like</Button> */}
      </Card.Body>
    </Card>
  );
};

export default CardItem;
