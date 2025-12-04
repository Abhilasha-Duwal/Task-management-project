# Task Management API

A simple RESTful API for managing tasks, built with **Node.js**, **Express**, and **MySQL**.  
Supports user authentication, CRUD operations for tasks, and pagination with sorting.

---

## Features

- User authentication (JWT-based)
- Create, read, update, and delete tasks
- Task overdue detection
- Pagination and sorting for task listing
- Structured API responses
- Dockerized development and production setup

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL database
- npm or yarn
- Docker & Docker Compose (optional for containerized setup)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Abhilasha-Duwal/Task-management-project.git
cd Server
```
2. Install Dependencies
```bash
npm install
```
### Setting up Environment Variables
3. Create Environment Variables
```bash
##make copy of .env.example file to .env
cp .env.example .env
```

### Run build and start server and stop server on Development mode with docker
4. To build server
```
make dev-build
make dev-build-detach // to build on detached mode
```
5. To start without build after successfull build of docker container
```
make dev-start
```
6. To stop server
```
make dev-stop
```

### Run build and start server and stop server on Production with docker

7. To build server
```
make prod-build
```
9. To stop server
```
make prod-stop
```





