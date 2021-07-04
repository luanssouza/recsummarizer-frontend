import React from "react";

// Style
import './Footer.css';

// Bootstrap imports
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <span className="text-muted">Place sticky footer content here.</span>
      </Container>
    </footer>
  );
};

export default Footer;
