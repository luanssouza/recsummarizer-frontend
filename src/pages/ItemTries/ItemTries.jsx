import React, { Component } from "react";

// Bootstrap imports
import { Button, Col, Container, Form, Row } from "react-bootstrap";

// Redux import
import { connect } from "react-redux";
import CommentTextArea from "../../components/Comments/Comments";

// Components
import Option from "../../components/Option/Option";
import { postTries } from "../../services/recommender";

class ItemTries extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      liked: 3,
      commentLiked: "",
    };
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

  handleChangeLiked = (event) => this.setState({ liked: event.target.value });

  handleChangeCommentLiked = (event) =>
    this.setState({ commentLiked: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      tries: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        liked: this.state.liked,
        commentLiked: this.state.commentLiked,
      },
    };

    this.props.loader(
      postTries(requestBody).then(() => {
        this.props.history.push("/explanation");
      })
    );
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Recommedation</h1>
        <hr />
        <h2 className="text-center">{this.state.item.title}</h2>
        <Row className="justify-content-md-center">
          <Col className="text-center" md={6}>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src={
                  "https://www.youtube.com/embed/" + this.state.item.youtubeId
                }
                frameBorder="0"
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          <hr />
          <h3>Questionnaire (before answer, try the movie trailer):</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemTries);
