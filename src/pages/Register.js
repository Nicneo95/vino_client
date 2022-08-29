import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Register() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState("");

  const updateFormField = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    let registerError = await context.userRegister(
      formState.first_name,
      formState.last_name,
      formState.email,
      formState.password
    );

    if (registerError) {
      setRegisterError(registerError);
    } else {
      setRegisterError("");
      navigate("/");
    }
  };

  return (
    <Container>
      <h1 className="my-5 text-center">Create Account</h1>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formState.first_name}
              onChange={updateFormField}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formState.last_name}
              onChange={updateFormField}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formState.email}
          onChange={updateFormField}
        />
      </Form.Group>
      <Form.Group className="mb-5" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formState.password}
          onChange={updateFormField}
        />
      </Form.Group>
      <p>{registerError}</p>
      <Row>
        <Col xs={12} md={3}>
          <Button
            onClick={() => {
              handleRegister();
            }}
          >
            Create
          </Button>
        </Col>
        <Col xs={12} md={4}>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Return to Store
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
