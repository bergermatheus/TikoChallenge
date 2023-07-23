import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditEventModal = ({ event, show, onClose, onFormSubmit }) => {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [maxAttendees, setMaxAttendees] = useState(event.max_attendees);

  const [startDateValue, setStartDateValue] = useState(event.start.slice(0, 10));
  const [startTimeValue, setStartTimeValue] = useState(event.start.slice(11, 16));

  const [endDateValue, setEndDateValue] = useState(event.end.slice(0, 10));
  const [endTimeValue, setEndTimeValue] = useState(event.end.slice(11, 16));



  const handleFormSubmit = async () => {
    try {
      // Get the access token from localStorage
      const access_token = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const start = `${startDateValue} ${startTimeValue}:00`;
      const end = `${endDateValue} ${endTimeValue}:00`;

      const postData = {
        "update": event.id,
        'name': name,
        'description': description,
        'max_attendees': maxAttendees,
        'start': start,
        'end': end,
      };

      // Send the POST request to update the event
      const response = await axios.post('http://0.0.0.0:8000/api/create-events/', postData, config);

      console.log(response.data);
      
      onFormSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">Name</label>
            <input type="text" className="form-control" id="eventName" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="eventDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="maxAttendees" className="form-label">Max Attendees</label>
            <input type="number" className="form-control" id="maxAttendees" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDatetime" className="form-label">Start Date</label>
            <input type="date" className="form-control" id="eventStartDate" value={startDateValue} onChange={(e) => setStartDateValue(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDatetime" className="form-label">Start Time</label>
            <input type="time" className="form-control" id="eventStartTime" value={startTimeValue} onChange={(e) => setStartTimeValue(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDatetime" className="form-label">End Date</label>
            <input type="date" className="form-control" id="eventEndDate" value={endDateValue} onChange={(e) => setEndDateValue(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDatetime" className="form-label">End Time</label>
            <input type="time" className="form-control" id="eventEndTime" value={endTimeValue} onChange={(e) => setEndTimeValue(e.target.value)} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleFormSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};


export default EditEventModal;