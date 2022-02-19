import React, { Component } from "react";

// Bootstrap imports
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

class SearchBar extends Component {
  state = { title: "", year: "", error: false };

  handleChangeTitle = (event) => this.setState({ title: event.target.value });

  handleChangeYear = (event) => {
    this.setState({ year: event.target.value });
    this.props.onSearch(this.state.title, event.target.value);
  };

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

    error = this.state.title.length > 2 ? false : true;

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
        <select
          className="form-control"
          onChange={(e) => this.handleChangeYear(e)}
        >
          <option value="">All years</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
        </select>
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
