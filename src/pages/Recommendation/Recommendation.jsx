import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

// Redux import
import { connect } from "react-redux";

// Service import
import { getExplanation, postEvaluation } from "../../services/recommender";

class Recommendation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 10,
      liked: "-1",
      understood: "-1",
      interest: "-1",
      discover: "-1",
      levelDiscover: "-1",
      levelFit: "-1",
    };

    this.changeExplanation();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeExplanation = () => {
    let requestBody = {
      movie_id: this.state.item.movie_id,
      n_clusters: this.state.details,
      rates: this.props.itens.itens,
    };

    this.props.loader(
      getExplanation(requestBody).then((response) => {
        let rec = this.state.item;
        rec.explanation = response.data.explanation;

        this.setState({ item: rec });
      })
    );
  };

  handleChangeDetails = (event) => {
    this.setState({ details: event.target.value });
  };

  handleChangeLiked = (event) => this.setState({ liked: event.target.value });

  handleChangeUnderstood = (event) =>
    this.setState({ understood: event.target.value });

  handleChangeInterest = (event) =>
    this.setState({ interest: event.target.value });

  handleChangeDiscover = (event) =>
    this.setState({ discover: event.target.value });

  handleChangeLevelDiscover = (event) =>
    this.setState({ levelDiscover: event.target.value });

  handleChangeLevelFit = (event) =>
    this.setState({ levelFit: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      evaluation: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        liked: this.state.liked,
        understood: this.state.understood,
        interest: this.state.interest,
        discover: this.state.discover,
        levelDiscover: this.state.levelDiscover,
        levelFit: this.state.levelFit,
      },
    };

    this.props.loader(
      postEvaluation(requestBody).then(() => {
        this.props.history.push("/explanation");
      })
    );
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Recommendation</h1>
        <hr />
        <h2 className="text-center">{this.state.item.title}</h2>
        <Row>
          <Col className="text-center">
            <Image src={this.state.item.poster} />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">{this.state.item.explanation}</Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <hr />
          {/* <h3>Questionnaire</h3> */}
          <Form.Group controlId="details">
            <Form.Label>Level of deatils of the explanation:</Form.Label>
            <RangeSlider
              value={this.state.details}
              onChange={this.handleChangeDetails}
              onAfterChange={this.changeExplanation}
              min={1}
              max={20}
            />
          </Form.Group>
          <hr />
          <Form.Group controlId="liked">
            <Form.Label>I liked this recommendation:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.liked}
              onChange={this.handleChangeLiked}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="understood">
            <Form.Label>
              I understood why this recommendation was made to me:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.understood}
              onChange={this.handleChangeUnderstood}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="interest">
            <Form.Label>
              The explanation increased my interest on this recommendation:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.interest}
              onChange={this.handleChangeInterest}
            >
              <option value="-1" disabled>
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
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="levelDiscover">
            <Form.Label>
              The explanation levels assist me to discover new informations
              about the recommended movie:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.levelDiscover}
              onChange={this.handleChangeLevelDiscover}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="levelFit">
            <Form.Label>
              The explanation levels alllows me to fit the explanations with my
              interests:
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.levelFit}
              onChange={this.handleChangeLevelFit}
            >
              <option value="-1" disabled>
                Select a option
              </option>
              <option value="0">Strongly disagree</option>
              <option value="1">Disagree</option>
              <option value="2">I don't know</option>
              <option value="3">Strongly agree</option>
              <option value="4">Agree</option>
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
  itens: state.itens,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
