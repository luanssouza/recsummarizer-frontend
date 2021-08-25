import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Image, Row } from "react-bootstrap";

class Recommendation extends Component {
  state = {
    item: {
      title: "Gone in Sixty Seconds",
      imageUrl: "/sixty_poster.jpg",
      explanation: `
        If you are a viewer interested in cars this production, by producer Jerry Bruckheimer
        (”Con Air, ” ”The Rock”), is worth seeing just to feast your eyes on the glossy vehicles.
        Though a little too long and not really full of action until the final twenty minutes, it
        moves well and has a good cast: Nicolas Cage, Will Patton, Robert Duvall, Giovanni
        Ribisi, Delroy Lindo, Christopher Eccleston, and others. The soundtrack to ”Gone in 60
        Seconds” contributes a great deal to the inspirational action scenes.
      `,
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
