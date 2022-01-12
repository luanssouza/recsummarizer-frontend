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
  postCompare,
} from "../../services/recommender";

// Components
import Option from "../../components/Option/Option";

class Explanation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 10,
      understood: 3,
      useful: 3,
      interest: 3,
      preferences: 3,
    };

    this.getExplanations();
  }

  labels = [
    "Totally explanation A",
    "More explanation A",
    "I don't know",
    "More explanation B",
    "Totally explanation B",
  ];

  ticks = ["Explanation A", null, "Neutral", null, "Explanation B"];

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getExplanations = () => {
    let requestBody = {
      movie_id: this.state.item.movie_id,
      n_clusters: this.state.details,
      rates: this.props.itens.itens,
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
      rates: this.props.itens.itens,
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
    this.setState({ understood: event.target.value });

  handleChangeUseful = (event) => this.setState({ useful: event.target.value });

  handleChangeInterest = (event) =>
    this.setState({ interest: event.target.value });

  handleChangePreferences = (event) =>
    this.setState({ preferences: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      compare: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        understood: this.state.understood,
        useful: this.state.useful,
        interest: this.state.interest,
        preferences: this.state.preferences,
      },
    };

    this.props.loader(
      postCompare(requestBody).then(() => {
        this.props.history.push("/final");
      })
    );
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
            <Form.Label>Level Of Details:</Form.Label>
            <RangeSlider
              value={this.state.details}
              onChange={this.handleChangeDetails}
              onAfterChange={this.changeExplanation}
              min={1}
              max={20}
            />
          </Form.Group>
          <hr />
          {/* <h3>
            Select the explanation that better fit with the following
            definitions:
          </h3> */}

          <Option
            controlId="liked"
            label="I understood why this movie was recommended to me:"
            value={this.state.understood}
            onChange={this.handleChangeUnderstood}
            labels={this.labels}
            ticks={this.ticks}
          />
          <Option
            controlId="useful"
            label="This explanation is useful for my choice:"
            value={this.state.useful}
            onChange={this.handleChangeUseful}
            labels={this.labels}
            ticks={this.ticks}
          />
          <Option
            controlId="interest"
            label="The explanation increased my interest on this recommendation:"
            value={this.state.interest}
            onChange={this.handleChangeInterest}
            labels={this.labels}
            ticks={this.ticks}
          />
          <Option
            controlId="preferences"
            label="The explanation fits with my preferences:"
            value={this.state.preferences}
            onChange={this.handleChangePreferences}
            labels={this.labels}
            ticks={this.ticks}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
