# Salon Booking API Documentation

Welcome to the API documentation for the **Salon Booking** project. This document provides details about the endpoints available, their functionalities, and examples of usage.



## Base URL

The base URL for all API endpoints is: `http://localhost:3000`

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). Include the JWT token in the `Authorization` header of your requests.

## Endpoints

### Authentication

- **Register**
  - `POST /api/auth/register`
  - Registers a new user.
  - Example Request:
    ```bash
    curl -X POST https://localhost:3000/auth/register \
      -H "Content-Type: application/json" \
      -d '{"username": "exampleuser", "password": "examplepassword"}'
    ```
  - Example Response:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login**
  - `POST /api/auth/login`
  - Logs in a user and returns a JWT token.
  - Example Request:
    ```bash
    curl -X POST https://localhost:3000/auth/login \
      -H "Content-Type: application/json" \
      -d '{"username": "exampleuser", "password": "examplepassword"}'
    ```
  - Example Response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Beautician Endpoints

- **Get All Beauticians**
  - `GET /api/beauticians`
  - Retrieves a list of all beauticians.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/beauticians
    ```
  - Example Response:
    ```json
    [
      {
        "_id": "60f6b5d5759c1a3b2c2b9f11",
        "name": "Akeba Thompson"
      },
      {
        "_id": "60f6b5d5759c1a3b2c2b9f12",
        "name": "John Doe"
      }
    ]
    ```

- **Get Beautician by ID**
  - `GET /api/beauticians/:beauticianId`
  - Retrieves details of a specific beautician by ID.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/beauticians/60f6b5d5759c1a3b2c2b9f11
    ```
  - Example Response:
    ```json
    {
      "_id": "60f6b5d5759c1a3b2c2b9f11",
      "name": "Akeba Thompson",
      "email": "akeba@example.com",
      "phone": "123-456-7890"
      // Other details
    }
    ```

### Saloon Endpoints

- **Get All Saloons**
  - `GET /api/saloons`
  - Retrieves a list of all saloons.
  - Requires authentication.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/saloons \
      -H "Authorization: Bearer <your_token>"
    ```
  - Example Response:
    ```json
    [
      {
        "_id": "60f6b5d5759c1a3b2c2b9f21",
        "name": "Cosmetropolis",
        "location": "Dallas, TX"
        // Other details
      },
      {
        "_id": "60f6b5d5759c1a3b2c2b9f22",
        "name": "Glamour Place",
        "location": "New York, NY"
        // Other details
      }
    ]
    ```

- **Get Saloon by ID**
  - `GET /api/saloons/:saloonId`
  - Retrieves details of a specific saloon by ID.
  - Requires authentication.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/saloons/60f6b5d5759c1a3b2c2b9f21 \
      -H "Authorization: Bearer <your_token>"
    ```
  - Example Response:
    ```json
    {
      "_id": "60f6b5d5759c1a3b2c2b9f21",
      "name": "Cosmetropolis",
      "location": "Dallas, TX",
      "address": "457 Washington Ave, Manchester, Kentucky 39495",
      "ratings": {
        "average": 4.7,
        "reviews": 180
      },
      "services": [
        {
          "_id": "60f6b5d5759c1a3b2c2b9f31",
          "name": "Haircut"
        },
        {
          "_id": "60f6b5d5759c1a3b2c2b9f32",
          "name": "Manicure"
        }
      ]
    }
    ```

### Service Endpoints

- **Get All Services**
  - `GET /api/services`
  - Retrieves a list of all services.
  - Requires authentication.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/services \
      -H "Authorization: Bearer <your_token>"
    ```
  - Example Response:
    ```json
    [
      {
        "_id": "60f6b5d5759c1a3b2c2b9f31",
        "name": "Haircut",
        "description": "Standard haircut service",
        "price": 50,
        // Other details
      },
      {
        "_id": "60f6b5d5759c1a3b2c2b9f32",
        "name": "Manicure",
        "description": "Basic manicure service",
        "price": 30,
        // Other details
      }
    ]
    ```

- **Get Services by Beautician**
  - `GET /api/services/beautician/:beauticianId`
  - Retrieves services offered by a specific beautician.
  - Example Request:
    ```bash
    curl -X GET https://localhost:3000/services/beautician/60f6b5d5759c1a3b2c2b9f11 \
      -H "Authorization: Bearer <your_token>"
    ```
  - Example Response:
    ```json
    [
      {
        "_id": "60f6b5d5759c1a3b2c2b9f31",
        "name": "Haircut",
        // Other service details
      },
      {
        "_id": "60f6b5d5759c1a3b2c2b9f32",
        "name": "Manicure",
        // Other service details
      }
    ]
    ```

### Appointments Endpoint

- **Book Appointment**
  - `POST /api/appointments/book`
  - Books an appointment with a beautician.
  - Requires authentication.
  - Example Request:
    ```bash
    curl -X POST https://localhost:3000/appointments/book \
      -H "Authorization: Bearer <your_token>" \
      -H "Content-Type: application/json" \
      -d '{"beautician": "60f6b5d5759c1a3b2c2b9f11", "service": "60f6b5d5759c1a3b2c2b9f31", "saloon": "60f6b5d5759c1a3b2c2b9f21", "appointmentDate": "2024-08-01T10:00:00Z", "status": "pending"}'
    ```
  - Example Response:
    ```json
    {
      "message": "Appointment booked successfully"
    }
    ```

### Error Handling

- **Invalid Endpoint**
  - `ALL /api/*`
  - Returns a 404 error for invalid endpoints.
  - Example Response:
    ```json
    {
      "status": false,
      "message": "Endpoint Not Found"
    }
    ```

## Conclusion

This concludes the API documentation for the **Salon Booking** project. Use the provided examples to interact with the API endpoints effectively. If you have any questions or need further assistance, please refer to the documentation or contact our support team.
