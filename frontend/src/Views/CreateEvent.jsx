import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxAttendees, setMaxAttendees] = useState(0);

  const [startDateValue, setStartDateValue] = useState();
  const [startTimeValue, setStartTimeValue] = useState();

  const [endDateValue, setEndDateValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();

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
        'name': name,
        'description': description,
        'max_attendees': maxAttendees,
        'start': start,
        'end': end,
      };

      // Send the POST request to update the event
      const response = await axios.post('http://0.0.0.0:8000/api/create-events/', postData, config);

      console.log(response.data);
      
      navigate('/all-events');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ width: '400px', margin: '0 auto' }}>
      <Card.Body>
        <Card.Title>Create Event</Card.Title>
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
          <Button variant="primary" onClick={handleFormSubmit}>Create Event</Button>
        </form>
      </Card.Body>
    </Card>
  )
}

export default CreateEvent;