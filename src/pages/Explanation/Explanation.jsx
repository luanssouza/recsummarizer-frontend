import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

// Redux import
import { connect } from "react-redux";

// Service import
import {
  getExplanation,
  getExplanationBaseline,
} from "../../services/recommender";

class Explanation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 10,
      understood: "-1",
      convincing: "-1",
      discover: "-1",
      trust: "-1",
    };

    this.getExplanations();
  }

  getExplanations = () => {
    let requestBody = {
      movie_id: this.state.item.movie_id,
      n_clusters: this.state.details,
    };

    this.props.loader(
      Promise.all([
        getExplanation(requestBody),
        getExplanationBaseline(requestBody),
      ]).then((responses) => {
        let rec = this.state.item;
        rec.explanationA = responses[0].data.explanation;
        rec.explanationB = responses[1].data.explanation;

        this.setState({ item: rec });
      })
    );
  };

  changeExplanation = () => {
    let requestBody = {
      movie_id: this.state.item.movie_id,
      n_clusters: this.state.details,
    };

    this.props.loader(
      getExplanation(requestBody).then((response) => {
        let rec = this.state.item;
        rec.explanationA = response.data.explanation;

        this.setState({ item: rec });
      })
    );
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
            <Image src={this.state.item.poster} />
          </Col>
        </Row>
        <Row>
          <Col className="text-center" md={6}>
            <strong>Explanation A</strong>
            <br />
            {this.state.item.explanationA}
          </Col>
          <Col className="text-center" md={6}>
            <strong>Explanation B</strong>
            <br />
            {this.state.item.explanationB}
          </Col>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          <hr />
          <Form.Group controlId="details">
            <Form.Label>Level Of Deatils:</Form.Label>
            <RangeSlider
              value={this.state.details}
              onChange={this.handleChangeDetails}
              onAfterChange={this.changeExplanation}
              min={1}
              max={20}
            />
          </Form.Group>
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

const mapStateToProps = (state) => ({
  recommendations: state.recommendations,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
