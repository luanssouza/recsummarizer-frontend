import React, { Component } from "react";

// Bootstrap imports
import { Button, Card, Col, Container, Row } from "react-bootstrap";

class Itens extends Component {
  state = {
    itens: [
      {
        title: "Cassino Royale",
        text: "",
        imageUrl: "/007_poster.jpg",
      },
      {
        title: "Shrek",
        text: "",
        imageUrl: "/shrek_poster.png",
      },
      {
        title: "The Lord of the Rings",
        text: "",
        imageUrl: "/lor_poster.jpg",
      },
    ],
    profileItens: [],
  };

  handleNext = (event) => {
    event.preventDefault();

    this.props.history.push("/recommendation");
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
        <Row>
          <Button onClick={this.handleNext}>
            Next
          </Button>
        </Row>
      </Container>
    );
  }
}

export default Itens;
