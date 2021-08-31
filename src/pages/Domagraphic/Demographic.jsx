import React, { Component } from "react";

// Bootstrap imports
import { Button, Container, Form } from "react-bootstrap";

class Demographic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      age: 0,
      gender: 0,
      education: 0,
      usedRecSys: 0,
    };
  }

  handleChangeAge = (event) => this.setState({ age: event.target.value });

  handleChangeGender = (event) => this.setState({ gender: event.target.value });

  handleChangeEducation = (event) =>
    this.setState({ education: event.target.value });

  handleChangeRecsys = (event) =>
    this.setState({ usedRecSys: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push("/itens");
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="age">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.age}
              onChange={this.handleChangeAge}
            >
              <option value="0">0-17</option>
              <option value="1">18-24</option>
              <option value="2">25-50</option>
              <option value="3">50-100</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.gender}
              onChange={this.handleChangeGender}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="education">
            <Form.Label>Education:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.education}
              onChange={this.handleChangeEducation}
            >
              <option value="0">High School</option>
              <option value="1">Bachelor's degree</option>
              <option value="2">Master's degree</option>
              <option value="3">PhD</option>
              <option value="4">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="usedRecSys">
            <Form.Label>
              Have you ever used another recommender systems? (Such as Amazon
              and Netflix)
            </Form.Label>
            <Form.Control
              as="select"
              value={this.state.usedRecSys}
              onChange={this.handleChangeRecsys}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
              <option value="2">I don't know</option>
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

export default Demographic;
