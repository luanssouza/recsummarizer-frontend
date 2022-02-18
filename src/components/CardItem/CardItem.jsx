import React from "react";

// Bootstrap imports
import { Card } from "react-bootstrap";

// React Stars
import Rating from "react-rating";

const CardItem = (props) => {
  return (
    <Card className="text-center h-100">
      <Card.Header as="h5">{props.item.title}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={props.item.poster} />
        <Card.Text>{props.item.text}</Card.Text>
        <Rating
          initialRating={props.item.rate}
          onChange={(rate) => props.onRate(props.index, rate)}
          emptySymbol={
            <img
              src="/star.svg"
              width="32px"
              className="icon"
              alt="empty star"
            />
          }
          fullSymbol={
            <img
              src="/star-fill.svg"
              width="32px"
              className="icon"
              alt="full star"
            />
          }
        />
      </Card.Body>
    </Card>
  );
};

export default CardItem;
