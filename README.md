# API Documentation

The task consists in creating a Rest API using Django to create an Event manager app. It should allow users to create a personal account, log in, and create, edit, fetch, and register to attend events. Each event should have at least a name, a description, a start date and end date and a list of attendees.


## Introduction
This API provides endpoints to manage events and attendees for a event.

## Base URL
The base URL for this API is `https://0.0.0.0:8000/`.

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, you must include the JWT token in the `Authorization` header of your requests.

## Endpoints

### Get All Events
- **Description:** Retrieve a list of all events.
- **URL:** `/api/events/`
- **Method:** GET
- **Authentication:** Yes
- **Parameters:** None
- **Request:**
    GET /api/events/
    Authorization: Bearer YOUR_JWT_TOKEN
- **Response:**
    Status: 200 OK
    Content-Type: application/json

    [
    {
    "id": 1,
    "name": "Conference A",
    "description": "Lorem ipsum...",
    "start_date": "2023-07-24T09:00:00Z",
    "end_date": "2023-07-25T17:00:00Z",
    "max_attendees": 100,
    "attendees": [1, 2, 3]
    },
    // more events...
    ]
### Create Event
- **Description:** Create a new event.
- **URL:** `/api/create-events/`
- **Method:** POST
- **Authentication:** Yes
- **Parameters:**
- `name`: Name of the event (string, required)
- `description`: Description of the event (string, required)
- `start_date`: Start date and time of the event (datetime, required)
- `end_date`: End date and time of the event (datetime, required)
- `max_attendees`: Maximum number of attendees for the event (integer, required)
- **Request:**
    POST /api/events/
    Content-Type: application/json
    Authorization: Bearer YOUR_JWT_TOKEN

    {
    "name": "Event A",
    "description": "Lorem ipsum...",
    "start_date": "2023-08-15T10:00:00Z",
    "end_date": "2023-08-17T18:00:00Z",
    "max_attendees": 150
    }