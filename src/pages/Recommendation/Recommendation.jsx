import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

// React Bootstrap Range Slider imports
import RangeSlider from "react-bootstrap-range-slider";

// Redux import
import { connect } from "react-redux";

// Service import
import { getExplanation, postEvaluation } from "../../services/recommender";

// Components
import Option from "../../components/Option/Option";
import CommentTextArea from "../../components/Comments/Comments";

class Recommendation extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      details: 10,
      liked: 3,
      commentLiked: "",
      understood: 3,
      commentUnderstood: "",
      interest: 3,
      commentInterest: "",
      useful: 3,
      commentUseful: "",
      preferences: 3,
      commentPreferences: "",
      levelFit: 3,
      commentLevelFit: "",
      levelUseful: 3,
      commentLevelUseful: "",
    };

    this.changeExplanation();
  }

  labels = [
    "Strongly disagree",
    "Disagree",
    "I don't know",
    "Agree",
    "Strongly agree",
  ];

  ticks = ["Disagree", null, "Neutral", null, "Agree"];

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeExplanation = () => {
    let requestBody = {
      movie_id: this.state.item.movie_id,
      n_clusters: this.state.details,
      rates: this.props.items.items,
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

  handleChangeCommentLiked = (event) =>
    this.setState({ commentLiked: event.target.value });

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

  handleChangeLevelFit = (event) =>
    this.setState({ levelFit: event.target.value });

  handleChangeCommentLevelFit = (event) =>
    this.setState({ commentLevelFit: event.target.value });

  handleChangeLevelUseful = (event) =>
    this.setState({ levelUseful: event.target.value });

  handleChangeCommentLevelUseful = (event) =>
    this.setState({ commentLevelUseful: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      evaluation: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        liked: this.state.liked,
        commentLiked: this.state.commentLiked,
        understood: this.state.understood,
        commentUnderstood: this.state.commentUnderstood,
        interest: this.state.interest,
        commentInterest: this.state.commentInterest,
        useful: this.state.useful,
        commentUseful: this.state.commentUseful,
        preferences: this.state.preferences,
        commentPreferences: this.state.commentPreferences,
        levelFit: this.state.levelFit,
        commentLevelFit: this.state.commentLevelFit,
        levelUseful: this.state.levelUseful,
        commentLevelUseful: this.state.commentLevelUseful,
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
          <h3>
            Questionnaire (before answer, try different levels of detail):
          </h3>
          <Form.Group controlId="details">
            <Form.Label>Level of details of the explanation:</Form.Label>
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
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentLiked}
            onChange={this.handleChangeCommentLiked}
            rows={1}
            maxlength={255}
          />
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
          <Option
            controlId="levelFit"
            label="The explanation levels allows me to fit the explanations with my
            interests:"
            value={this.state.levelFit}
            onChange={this.handleChangeLevelFit}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentLevelFit}
            onChange={this.handleChangeCommentLevelFit}
            rows={1}
            maxlength={255}
          />
          <Option
            controlId="levelUseful"
            label="Changing the explanation levels was useful for my choice:"
            value={this.state.levelUseful}
            onChange={this.handleChangeLevelUseful}
            labels={this.labels}
            ticks={this.ticks}
          />
          <CommentTextArea
            text="Comments or Suggestions:"
            comment={this.state.commentLevelUseful}
            onChange={this.handleChangeCommentLevelUseful}
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
