import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') || false;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    // Delete the access token from localStorage
    localStorage.removeItem('access_token');
    // Redirect to the login page after logout
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null; // Hide the navbar on the login view
  }

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/all-events">Tiko Events</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/all-events">All Events</Nav.Link>
          <Nav.Link href="/my-events">My Events</Nav.Link>
          <Nav.Link href="/create-event">Create Event</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;