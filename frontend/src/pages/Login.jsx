import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import './style/Signup.css'
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isError, isLoading, error }] = useLoginMutation()
  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="login_form--container">
          <Form
            style={{
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <h1>Login to your account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter password</Form.Label>
              <Form.Control
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                value={password}
                required
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading}>Login</Button>
            </Form.Group>
            <p>Don't have a account? <Link to="/signup">Create account</Link></p>
          </Form>
        </Col>
        <Col md={6} className="login_image--container"></Col>
      </Row>
    </Container>
  );
}
