import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/register/', { 'name': name, 'username': email, 'password': password })
    .then((response) => {
      console.log(response.data);

      // Redirect to another page after successful login
      navigate('/login');
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Tiko Events</h2>
                  <p className=" mb-5">Insert your name, email and password</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formRegisterName">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Enter name"
                          value={name}
                          onChange={handleNameChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formRegisterEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formRegisterPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                      <Button 
                          variant="primary"
                          type="submit"
                          onClick={handleSubmit}>
                          Register
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;