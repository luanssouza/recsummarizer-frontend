import React from "react";

// Bootstrap imports
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
