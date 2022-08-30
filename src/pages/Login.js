import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { Form, Button, Row, Col, Container } from "react-bootstrap";

export default function Login() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const updateFormField = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    console.log(context)
    let loginError = await context.userLogin(
      formState.email,
      formState.password
    );

    if (loginError) {
      setLoginError(loginError);
    } else {
      setLoginError("");
      navigate("/");
    }
  };

  const handleRegister = async () => {
    navigate("/account/register");
  };

  return (
    <React.Fragment>
      <div className="content">
        <Container>
          <h1 className="my-5 text-center">LOGIN</h1>
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

          <p>{loginError}</p>

          <Row>
            <Button
              variant="secondary m-1"
              style={{ width: "80px" }}
              onClick={() => {
                handleLogin();
              }}
            >
              SIGN IN
            </Button>

            <Button
              variant="secondary m-1"
              style={{ width: "140px" }}
              onClick={() => {
                handleRegister();
              }}
            >
              CREATE ACCOUNT
            </Button>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
