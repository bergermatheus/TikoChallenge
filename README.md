# API Documentation

The task consists in creating a Rest API using Django to create an Event manager app. It should allow users to create a personal account, log in, and create, edit, fetch, and register to attend events. Each event should have at least a name, a description, a start date and end date and a list of attendees.


## Introduction
This API provides endpoints to manage events and attendees for a event. All the application was dockerized, so you can clone the git repository:

```
git clone https://github.com/bergermatheus/TikoChallenge.git
```

And then inside of the folder TikoChallenge you will find a file docker-compose.yaml.
In this place you have to run the following command:

```
docker-compose up --build
```
Take a coffe and wait until the end of the building.

To stop the app you have to press ctrl+c on your terminal, then:

```
docker-compose down
```
If you want to run again:

```
docker-compose up
```

## Base URL
The base URL for this API is `http://0.0.0.0:8000/`. The base URL for the frontend is `http://0.0.0.0:3000/`.

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
    "subscribers": [1, 2, 3]
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
    POST /api/create-events/
    Content-Type: application/json
    Authorization: Bearer YOUR_JWT_TOKEN

    {
    "name": "Event A",
    "description": "Lorem ipsum...",
    "start_date": "2023-08-15 10:00:00",
    "end_date": "2023-08-17 18:00:00",
    "max_attendees": 150
    }

### Update Event
- **Description:** Update a event.
- **URL:** `/api/create-events/`
- **Method:** POST
- **Authentication:** Yes
- **Parameters:**
- `update`: the ID of the event you want to update,
- `name`: Name of the event (string, required)
- `description`: Description of the event (string, required)
- `start_date`: Start date and time of the event (datetime, required)
- `end_date`: End date and time of the event (datetime, required)
- `max_attendees`: Maximum number of attendees for the event (integer, required)
- **Request:**
    POST /api/create-events/
    Content-Type: application/json
    Authorization: Bearer YOUR_JWT_TOKEN

    {
    "update": "id_string,
    "name": "Event A",
    "description": "Lorem ipsum...",
    "start_date": "2023-08-15 10:00:00",
    "end_date": "2023-08-17 18:00:00",
    "max_attendees": 150
    }

### Register
- **Description:** Register a new user.
- **URL:** `/api/register/`
- **Method:** POST
- **Authentication:** No
- **Parameters:**
  - `name`: Name of the user (string, required)
  - `email`: Email address of the user (string, required)
  - `password`: Password for the user (string, required)

POST /api/register/
Content-Type: application/json

{
"name": "john doe",
"email": "john.doe@example.com",
"password": "password123"
}



### Login
- **Description:** Log in an existing user and retrieve an access token.
- **URL:** `/api/login/`
- **Method:** POST
- **Authentication:** No
- **Parameters:**
- `username`: email of the user (string, required)
- `password`: Password of the user (string, required)
- **Request:**

POST /api/login/
Content-Type: application/json

{
"username": "john_doe@test.com",
"password": "password123"
}

## Access Swagger UI
With the development server running, you can now access the Swagger UI in your web browser. Open your browser and go to the following URL:

`http://0.0.0.0:8000/api/swagger/`
You should see the Swagger UI interface displaying your API's endpoints and documentation.