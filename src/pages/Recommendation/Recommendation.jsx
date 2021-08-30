import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

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
    details: 1,
    understood: null,
    convincing: null,
    discover: null,
    trust: null,
  };

  handleChangeDetails = (event) =>
    this.setState({ details: event.target.value });

  handleChangeUnderstood = (event) =>
    this.setState({ details: event.target.understood });

  handleChangeConvincing = (event) =>
    this.setState({ details: event.target.convincing });

  handleChangeDiscover = (event) =>
    this.setState({ details: event.target.discover });

  handleChangeTrust = (event) => this.setState({ details: event.target.trust });

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push("/itens");
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

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="details">
            <Form.Label>Level Of Deatils:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.details}
              onChange={this.handleChangeDetails}
            >
              <option value="0">Short</option>
              <option value="1">Medium</option>
              <option value="2">Long</option>
            </Form.Control>
          </Form.Group>
          <hr />
          <h3>Questionnaire</h3>
          <Form.Group controlId="understood">
            <Form.Label>
              I understood why this movie was recommended to me:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.understood}
              onChange={this.handleChangeUnderstood}
            >
              <option value="" disabled selected>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
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
              <option value="" disabled selected>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
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
              <option value="" disabled selected>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
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
              <option value="" disabled selected>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Recommendation;
