import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

// Redux import
import { connect } from "react-redux";
import Option from "../../components/Option/Option";

// Service import
import { getExplanation, postEvaluation } from "../../services/recommender";

class Recommendation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 10,
      liked: 3,
      understood: 3,
      interest: 3,
      discover: 3,
      levelDiscover: 3,
      levelFit: 3,
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
        this.props.history.push("/itemTries");
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
          <Option
            controlId="liked"
            label="I liked this recommendation:"
            value={this.state.liked}
            onChange={this.handleChangeLiked}
          />
          <Option
            controlId="understood"
            label="I understood why this recommendation was made to me:"
            value={this.state.understood}
            onChange={this.handleChangeUnderstood}
          />
          <Option
            controlId="interest"
            label="The explanation increased my interest on this recommendation:"
            value={this.state.interest}
            onChange={this.handleChangeInterest}
          />
          <Option
            controlId="discover"
            label="The explanation helped me discover new information about this
            movie:"
            value={this.state.discover}
            onChange={this.handleChangeDiscover}
          />
          <Option
            controlId="levelDiscover"
            label="The explanation levels assist me to discover new informations
            about the recommended movie:"
            value={this.state.levelDiscover}
            onChange={this.handleChangeLevelDiscover}
          />
          <Option
            controlId="levelFit"
            label="The explanation levels alllows me to fit the explanations with my
            interests:"
            value={this.state.levelFit}
            onChange={this.handleChangeLevelFit}
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
