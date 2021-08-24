import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Image, Row } from "react-bootstrap";

class Recommendation extends Component {
  state = {
    item: {
      title: "Chuck Norris API - Example",
      imageUrl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      explanation: "Chuck Norris is the only person who can divide by 0.",
    },
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Recommendation</h1>
        <hr />
        <h2 className="text-center">{this.state.item.title}</h2>
        <Row>
          <Col className="text-center">
            <Image src={this.state.item.imageUrl} />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">{this.state.item.explanation}</Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 8 }} className="text-right">
            <Button variant="primary">Next</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Recommendation;
