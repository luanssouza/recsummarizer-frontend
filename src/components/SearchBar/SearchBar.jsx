import React, { Component } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

class SearchBar extends Component {
  state = { title: "", error: false };

  handleChangeTitle = (event) => this.setState({ title: event.target.value });

  onKeyPressSearch = (event) => {
    if (event.key === "Enter") this.props.onSearch(this.state.title);

    let error = this.state.error;

    error = error && this.state.title.length > 1 ? !error : error;

    this.setState({ error });
  };

  onSearch = async () => {
    await this.updateValid();
    if (!this.state.error) this.props.onSearch(this.state.title);
  };

  updateValid = () => {
    let error = this.state.error;

    error = error && this.state.title.length > 2 ? !error : true;

    this.setState({ error });
  };

  render() {
    return (
      <InputGroup className="mb-3 mt-3">
        <FormControl
          placeholder="Search for a movie"
          aria-label="Search for a movie"
          aria-describedby="search"
          onChange={this.handleChangeTitle}
          onKeyPress={this.onKeyPressSearch}
          isInvalid={this.state.error}
          onBlur={this.updateValid}
        />
        <Button id="search" onClick={this.onSearch}>
          Search
        </Button>
        <Form.Control.Feedback type="invalid">
          Type at least 3 characters!
        </Form.Control.Feedback>
      </InputGroup>
    );
  }
}

export default SearchBar;
