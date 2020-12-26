import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../UserContext';


function LoginPage() {
  
  const { login } = useContext(UserContext);

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
    // Router navigator
  const navigate = useNavigate();


  function getUser() {
    console.log("Client: Getuser request");
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => console.log("Client: Received getuser data", data));
  }

  // Logic for handling authentication
  function verifyUser() {
    console.log("User request is", "/api/users/" + username)
    fetch('/api/users/' + username)
    .then((response) => response.json())
    .then((data) => {
      console.log("Client: Received request data", data);
      // Usernames must be unique
      if (data.length == 1 && data[0]['hash_password'] == password) {

        // User is authenticated
        console.log("User authenticated!")
        login(username, data[0]['id']);

        // Redirect to portfolio page
        navigate("/portfolio");

      } else {
        alert("Incorrect username or password");
      }
    })
  }

  // Guest login
  function loginAsGuest() {
    setUsername("Guest")
    setPassword("hunter2")
    verifyUser();
  }

  // Register a new user
  function addUser() {
    let username = prompt("Enter name")
    let hash_password = prompt("Enter password");
    let cash = prompt("Enter cash")
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, hash_password, cash })
    })
      .then(data => {
        alert(data);
        getUser();
      })
  }

  return (
    <div className="LoginPage">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <ButtonGroup>
          <Button
          variant="primary"
          // type="submit"
          onClick = {verifyUser}>
            Submit
       </Button>
          <Button 
          variant="info"
          onClick = {loginAsGuest}>
            Guest mode
       </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}

export { LoginPage };
