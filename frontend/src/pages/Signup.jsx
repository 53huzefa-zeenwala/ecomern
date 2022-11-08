import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './style/Signup.css'
import { useSignupMutation } from '../services/appApi'
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('')
  const [signup, { error, isLoading, isError }] = useSignupMutation()
  const handleSubmit = (e) => {
    e.preventDefault()
    signup({ name, email, password })
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="signup_form--container">
          <Form
            style={{
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <h1>Create an account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                value={password}
                required
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading}>Create  account</Button>
            </Form.Group>
            <p>
              Already have a account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup_image--container"></Col>
      </Row>
    </Container>
  );
}
