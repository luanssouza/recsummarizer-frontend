import "./Final.css";

import React, { Component } from "react";

// Bootstrap imports
import { Button, Container, Form } from "react-bootstrap";

// Redux import
import { connect } from "react-redux";

// Components
import { postComment } from "../../services/recommender";
import ModalMessage from "../../components/ModalMessage/ModalMessage";

class Final extends Component {
  constructor(props) {
    super(props);

    let rec = this.props.recommendations.recommendations;

    this.state = {
      item: rec,
      comment: "",
      modalShow: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChangeComment = (event) =>
    this.setState({ comment: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    let requestBody = {
      comment: {
        user_id: this.props.user.user.user_id,
        movie_id: this.state.item.movie_id,
        comment: this.state.comment,
      },
    };

    this.props.loader(
      postComment(requestBody).then(() => {
        this.onModalMessageChange();
        this.setState({ comment: "" });
      })
    );
  };

  onModalMessageChange = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Final</h1>
        <hr />
        <h3 className="text-center">End of experiment!</h3>
        <h3 className="text-center">Thank you for your participation!</h3>

        <Form onSubmit={this.handleSubmit}>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>
              If you have any comments or suggestions, please, let we know:
            </Form.Label>
            <Form.Control
              value={this.state.comment}
              as="textarea"
              rows={3}
              maxLength="255"
              onChange={this.handleChangeComment}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="float-right">
            Send
          </Button>
        </Form>

        <ModalMessage
          show={this.state.modalShow}
          onHide={this.onModalMessageChange}
          title="Success!"
          text="Thank you!"
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendations: state.recommendations,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Final);
