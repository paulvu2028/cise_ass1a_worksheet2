import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; SERPER SYSTEM</Col>
        </Row>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Developed by Paul, Peter and Mark of Auckland Insitute of Technology
        </div>
        <div> </div>
      </Container>
    </footer>
  );
};

export default Footer;
