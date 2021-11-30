import React from "react";

// Style
import './Footer.css';

// Bootstrap imports
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="d-flex justify-content-end">
        <a href="https://icmc.usp.br/">Instituto de Ciências Matemáticas e de Computação - ICMC</a>
      </Container>
    </footer>
  );
};

export default Footer;
