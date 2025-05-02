# IFN666 Assignment 2 - Vehicle Driver Management API

## 🚀 Purpose of the Application

This web application provides a RESTful API for managing drivers, vehicles, and user accounts in a transport or fleet management system. It is designed using a modern decoupled architecture and supports full CRUD operations, user authentication, and MongoDB integration. The client-side React app interacts with this backend to manage resources efficiently.

---

## 📌 API Endpoints

### 📁 Drivers (`/api/drivers`)
- `GET /api/drivers` – Get all drivers
- `GET /api/drivers/:id` – Get a driver by licence number
- `POST /api/drivers` – Create a new driver
- `PUT /api/drivers/:id` – Update an existing driver
- `DELETE /api/drivers/:id` – Delete a driver

### 🚗 Vehicles (`/api/vehicles`)
- `GET /api/vehicles` – Get all vehicles
- `GET /api/vehicles/:id` – Get a vehicle by ID
- `POST /api/vehicles` – Create a new vehicle
- `PUT /api/vehicles/:id` – Update a vehicle
- `DELETE /api/vehicles/:id` – Delete a vehicle

### 👤 Users (`/api/users`)
- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Authenticate user and return JWT
- `GET /api/users/me` – Get profile of the logged-in user (auth protected)

---

## 🤝 How to Contribute

1. Fork this repository.
2. Create a new branch from `assignment-2`:
   ```bash
   git checkout -b feature/your-feature-name

3. Make your changes.
4. Commit and push:

   ```bash
   git commit -m "Add your message"
   git push origin feature/your-feature-name
   ```
5. Create a pull request to merge into `assignment-2`.

---

## ✨ Features

* REST API with 3 main entities: Drivers, Vehicles, Users
* JWT-based authentication and protected routes
* MongoDB with Mongoose ODM
* Input validation middleware
* Clean, modular folder structure
* Caddy deployment support
* Ready for integration with a Vite + React front end

---

## 🧩 Dependencies

| Package            | Purpose                        |
| ------------------ | ------------------------------ |
| express            | REST API framework             |
| mongoose           | MongoDB object modeling        |
| dotenv             | Environment variable loading   |
| jsonwebtoken       | JWT authentication             |
| bcrypt             | Password hashing               |
| helmet             | Basic API security headers     |
| express-rate-limit | Rate limiting to prevent abuse |

To install dependencies:

```bash
npm install
```

---

## 🏗️ Application Architecture

```
.
├── API-collection.json       # Exported Hoppscotch collection for testing
├── README.md                 # Project documentation
├── package.json              # Project metadata and dependencies
├── server.js                 # Entry point of the server
└── src
    ├── controllers           # Business logic for each entity
    ├── middleware            # Custom middleware (e.g., auth, validation)
    ├── models                # Mongoose schemas and DB logic
    └── routes                # Express routers grouped by entity
```

---

## 🛠️ Reporting Issues

Please report bugs or feature requests by opening an issue in the GitHub repository. Include:

* A clear title
* Steps to reproduce
* Expected vs. actual behavior
* Screenshots or logs if relevant

```
