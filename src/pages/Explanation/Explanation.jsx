import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

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
import CommentTextArea from "../../components/Comments/Comments";

class Explanation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 20,
      understood: 3,
      commentUnderstood: "",
      interest: 3,
      commentInterest: "",
      useful: 3,
      commentUseful: "",
      preferences: 3,
      commentPreferences: "",
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
      rates: this.props.items.items,
    };

    this.props.loader(
      Promise.all([
        getExplanationBaseline(requestBody),
        getExplanation(requestBody),
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
      rates: this.props.items.items,
    };

    this.props.loader(
      getExplanation(requestBody).then((response) => {
        let rec = this.state.item;
        rec.explanationB = response.data.explanation;

        this.setState({ item: rec });
      })
    );
  };

  handleChangeUnderstood = (event) =>
    this.setState({ understood: event.target.value });

    handleChangeCommentUnderstood = (event) =>
    this.setState({ commentUnderstood: event.target.value });

  handleChangeInterest = (event) =>
    this.setState({ interest: event.target.value });

  handleChangeCommentInterest = (event) =>
    this.setState({ commentInterest: event.target.value });

  handleChangeUseful = (event) => this.setState({ useful: event.target.value });

  handleChangeCommentUseful = (event) =>
    this.setState({ commentUseful: event.target.value });

  handleChangePreferences = (event) =>
    this.setState({ preferences: event.target.value });

  handleChangeCommentPreferences = (event) =>
    this.setState({ commentPreferences: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      compare: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        understood: this.state.understood,
        commentUnderstood: this.state.commentUnderstood,
        interest: this.state.interest,
        commentInterest: this.state.commentInterest,
        useful: this.state.useful,
        commentUseful: this.state.commentUseful,
        preferences: this.state.preferences,
        commentPreferences: this.state.commentPreferences,
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
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <h3>
            Inform which explanation better fits with the definitions:
          </h3>
          <Option
            controlId="understood"
            label="I understood why this recommendation was made to me:"
            value={this.state.understood}
            onChange={this.handleChangeUnderstood}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentUnderstood}
            onChange={this.handleChangeCommentUnderstood}
            rows={1}
            maxlength={255}
          />
          <Option
            controlId="useful"
            label="This explanation is useful for my choice:"
            value={this.state.useful}
            onChange={this.handleChangeUseful}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentUseful}
            onChange={this.handleChangeCommentUseful}
            rows={1}
            maxlength={255}
          />
          <Option
            controlId="interest"
            label="The explanation increased my interest on this recommendation:"
            value={this.state.interest}
            onChange={this.handleChangeInterest}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentInterest}
            onChange={this.handleChangeCommentInterest}
            rows={1}
            maxlength={255}
          />
          <Option
            controlId="preferences"
            label="The explanation fits with my preferences:"
            value={this.state.preferences}
            onChange={this.handleChangePreferences}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentPreferences}
            onChange={this.handleChangeCommentPreferences}
            rows={1}
            maxlength={255}
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
  items: state.items,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
