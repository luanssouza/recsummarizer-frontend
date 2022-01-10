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
      convincing: 3,
      discover: 3,
      trust: 3,
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

  handleChangeConvincing = (event) =>
    this.setState({ convincing: event.target.value });

  handleChangeDiscover = (event) =>
    this.setState({ discover: event.target.value });

  handleChangeTrust = (event) => this.setState({ trust: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      compare: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        understood: this.state.understood,
        convincing: this.state.convincing,
        discover: this.state.discover,
        trust: this.state.trust,
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
            controlId="convincing"
            label="The explanation made the recommendation more convinving:"
            value={this.state.convincing}
            onChange={this.handleChangeConvincing}
            labels={this.labels}
            ticks={this.ticks}
          />
          <Option
            controlId="discover"
            label="The explanation helped me discover new information about this
            movie:"
            value={this.state.discover}
            onChange={this.handleChangeDiscover}
            labels={this.labels}
            ticks={this.ticks}
          />
          <Option
            controlId="trust"
            label="The explanation increased my trust in the recommender system:"
            value={this.state.trust}
            onChange={this.handleChangeTrust}
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
