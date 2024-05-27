# Grocery Management API

This project is a Grocery Management API built with Node.js, Express, and PostgreSQL. It allows users to manage grocery items, handle user authentication, and authorize certain actions based on user roles.

## Features

- User Registration
- User Login with JWT Authentication
- CRUD operations for grocery items
- Role-based access control (Admin and User)
- Inventory management with logging of actions
- Purchase groceries and update inventory

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or later)
- Docker (for running PostgreSQL database)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/grv20/qp-assessment.git
cd qp-assessment
```

## Set Up Environment Variables

Create a .env file in the root directory of the project and add the following:

DATABASE_URL=postgres://qp_user:qp_db_123@db:5432/qp_db
PORT=3000
JWT_SECRET=your_jwt_secret_key

## Start Docker

Create a .env file in the root directory of the project and add the following:

```bash
docker compose up --build
```
