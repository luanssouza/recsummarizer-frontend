import React from "react";

// Bootstrap imports
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar variant="dark" className="header">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <img src="/icmc.png" alt="icmc" width="40" />
      </Container>
    </Navbar>
  );
};

export default Header;
