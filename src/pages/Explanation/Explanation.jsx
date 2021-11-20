import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

class Explanation extends Component {
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
    details: 1,
    understood: "-1",
    convincing: "-1",
    discover: "-1",
    trust: "-1",
  };

  handleChangeDetails = (event) =>
    this.setState({ details: event.target.value });

  handleChangeUnderstood = (event) =>
    this.setState({ understood: event.target.understood });

  handleChangeConvincing = (event) =>
    this.setState({ convincing: event.target.convincing });

  handleChangeDiscover = (event) =>
    this.setState({ discover: event.target.discover });

  handleChangeTrust = (event) => this.setState({ trust: event.target.trust });

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push("/itens");
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Compare the Explanations</h1>
        <hr />
        <h2 className="text-center">{this.state.item.title}</h2>
        <Row>
          <Col className="text-center">
            <Image src={this.state.item.imageUrl} />
          </Col>
        </Row>
        <Row>
          <Col className="text-center" md={6}>
            <strong>Explanation A</strong>
            <br />
            {this.state.item.explanation}
          </Col>
          <Col className="text-center" md={6}>
            <strong>Explanation B</strong>
            <br />
            {this.state.item.explanation}
          </Col>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          <hr />
          <h3>
            Select the explanation that better fit with the following
            definitions:
          </h3>
          <Form.Group controlId="understood">
            <Form.Label>
              I understood why this movie was recommended to me:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.understood}
              onChange={this.handleChangeUnderstood}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Explanation A</option>
              <option value="1">Explanation B</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="convincing">
            <Form.Label>
              The explanation made the recommendation more convinving:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.convincing}
              onChange={this.handleChangeConvincing}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Explanation A</option>
              <option value="1">Explanation B</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="discover">
            <Form.Label>
              The explanation helped me discover new information about this
              movie:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.discover}
              onChange={this.handleChangeDiscover}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Explanation A</option>
              <option value="1">Explanation B</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="trust">
            <Form.Label>
              The explanation increased my trust in the recommender system:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.trust}
              onChange={this.handleChangeTrust}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Explanation A</option>
              <option value="1">Explanation B</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="float-right">
            Next
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Explanation;
