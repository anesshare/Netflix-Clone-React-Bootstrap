
import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const isAuthenticated = formData.username === "anesshare" && formData.password === "user123";

    if (isAuthenticated) {
      onLogin(); 
      navigate('/');
    } else {
      setError("Incorrect username or password");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    setError(null);
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      className="text-white p-5 d-flex align-items-center justify-content-center"
    >
      <Form style={{ background: 'linear-gradient(to right, black, gray)', borderRadius: '10px', flexDirection: 'column' }} className="text-white p-5 d-flex align-items-center justify-content-center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            style={{ width: '280px' }}
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            style={{ width: "280px" }}
            value={formData.password}
            onChange={handleInputChange}
          />
          {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
        </Form.Group>
        <Button variant="danger" type="submit">
          Submit
        </Button>
        <p>username: anesshare</p>
        <p>password: user123</p>
      </Form>
    </Container>
  );
}

export default Login;
