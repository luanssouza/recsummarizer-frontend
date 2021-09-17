import React, { Component } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

class SearchBar extends Component {
  state = { title: "" };

  handleChangeTitle = (event) => this.setState({ title: event.target.value });

  onKeyPressSearch = (event) => {
    if (event.key === "Enter") this.props.onSearch(this.state.title);
  };

  onSearch = () => {
    this.props.onSearch(this.state.title);
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
        />
        <Button id="search" onClick={this.onSearch}>
          Search
        </Button>
      </InputGroup>
    );
  }
}

export default SearchBar;
