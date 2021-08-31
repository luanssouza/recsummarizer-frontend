import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function SearchBar(props) {
  return (
    <InputGroup className="mb-3 mt-3">
      <FormControl
        placeholder="Search for a movie"
        aria-label="Search for a movie"
        aria-describedby="search"
      />
      <Button id="search">
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
