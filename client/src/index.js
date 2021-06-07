import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

ReactDOM.render(
  <Container fluid>
    <Row className="vh-100">
      <Col
        xs={12}
        sm={{ span: 8, offset: 2 }}
        style={{ marginBottom: 50 }}
        className="main-container"
      >
        <App />
      </Col>
    </Row>
  </Container>,
  document.getElementById("root")
)
