import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import formatTime from '../Utilities/formatTime';
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [data, setData] = useState({ all_events: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Define the fetchEvents function outside of useEffect
  const fetchEvents = async () => {
    try {
      // Get the access token from localStorage
      const access_token = localStorage.getItem('access_token');

      // Include the access token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get('http://0.0.0.0:8000/api/events/', config);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    // Fetch events data
    fetchEvents();
  }, []);

  const handleSubscribe = async (eventId) => {
    try {
      // Get the access token from localStorage
      const access_token = localStorage.getItem('access_token');

      // Include the access token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      // Prepare the JSON data for the POST request
      const postData = {
        'id': eventId,
        'subscribe': 'True',
      };

      // Send the POST request to the server
      const response = await axios.post('http://0.0.0.0:8000/api/events/', postData, config);

      if (!response.data.success) {
        // Subscription failed, set the error message
        setError(response.data.reason);
      } 
      else {
        // Subscription successful, fetch the updated events data
        await fetchEvents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsubscribe = async (eventId) => {
    try {
      // Get the access token from localStorage
      const access_token = localStorage.getItem('access_token');

      // Include the access token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      // Prepare the JSON data for the POST request
      const postData = {
        'id': eventId,
        'subscribe': 'False',
      };

      // Send the POST request to the server
      await axios.post('http://0.0.0.0:8000/api/events/', postData, config);

      // Fetch the updated events data
      await fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseErrorModal = () => {
    // Close the error modal and reset the error state
    setError(null);
  };

  return (
    <Container>
      <h2>All Events</h2>
      <Row>
        {data.all_events.map(event => (
          <Col key={event.id} sm={12} md={6} lg={4} xl={3}>
            <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
              <Card style={{ width: '100%', marginBottom: '20px' }}>
                <Card.Header>{event.name}</Card.Header>
                <Card.Body>
                  <Card.Title style={{ fontSize: '14px', textAlign: 'left' }}>
                    Max Attendees: {event.max_attendees}
                  </Card.Title>
                  <Card.Text style={{ fontSize: '14px', textAlign: 'left' }}>
                    Descripton: {event.description}
                    <div>Start: {formatTime(event.start)}</div>
                    <div>End: {formatTime(event.end)}</div>
                    <div style={{ marginTop: '10px' }}>
                      {event.subscribers.length > 0 ? (
                        event.subscribers.map(subscriber => (
                          <Badge key={subscriber.name} bg="secondary" pill style={{ marginRight: '5px' }}>
                            {subscriber.name}
                          </Badge>
                        ))
                      ) : (
                        <Badge bg="secondary" pill>No subscribers</Badge>
                      )}
                    </div>
                  </Card.Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="dark" size="sm"
                      onClick={() => handleSubscribe(event.id)}>
                      Subscribe
                    </Button>
                    <Button variant="dark" size="sm"
                      onClick={() => handleUnsubscribe(event.id)}>
                      Unsubscribe
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={!!error} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllEvents;