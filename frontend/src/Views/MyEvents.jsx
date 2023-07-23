import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import formatTime from '../Utilities/formatTime';
import EditEventModal from '../components/layout/EditEventModal';


const MyEventsView = () => {
  const [data, setData] = useState({ my_events: [] });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => {
    setSelectedEvent(event); // Store the event being edited in the state
    setShowEditModal(true); // Show the edit modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Hide the edit modal
  };

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

      const response = await axios.get('http://localhost:8000/api/events/', config);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch events data
    fetchEvents();
  }, []);


  return (
    <Container>
      <h2>My Events</h2>
      <Row>
        {data.my_events.map(event => (
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
                    <Button key={event.id} variant="dark" size="sm" onClick={() => handleEdit(event)}>
                      Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      {/* Edit Event Modal */}
      {showEditModal && (
        <EditEventModal
          event={selectedEvent}
          show={showEditModal}
          onClose={handleCloseEditModal}
          onFormSubmit={fetchEvents}
        />
      )}
    </Container>
  );
};

export default MyEventsView;