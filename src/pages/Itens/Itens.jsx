import React, { Component } from "react";

// Bootstrap imports
import { Button, Card, Col, Container, Row } from "react-bootstrap";

class Itens extends Component {
  state = {
    itens: [
      {
        title: "Chuck Norris API - Example",
        text: "Chuck Norris is the only person who can divide by 0.",
        imageUrl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      },
      {
        title: "Chuck Norris API - Example",
        text: "Chuck Norris is the only person who can divide by 0.",
        imageUrl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      },
      {
        title: "Chuck Norris API - Example",
        text: "Chuck Norris is the only person who can divide by 0.",
        imageUrl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      },
    ],
    profileItens: [],
  };

  addItem = () => {
    let state = { films: [] };
    this.setState(state);
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.itens.map((item, index) => {
            return (
              <Col md={4} key={index}>
                <Card>
                  <Card.Header as="h5">{item.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Text>{item.text}</Card.Text>
                    <Button variant="primary">Like</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Itens;
