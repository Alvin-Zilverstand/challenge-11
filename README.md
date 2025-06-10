# Car Tuning CRM System

A modern CRM system for car tuning businesses, built with React and Node.js.

## Features

- User authentication and authorization
- Customer management
- Contact history tracking
- Car modification details
- Modern, responsive UI
- Search and filter capabilities

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd car-tuning-crm
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/car-tuning-crm
JWT_SECRET=your-secret-key
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/login - User login
- POST /api/auth/register - Register new user (admin only)

### Customers
- GET /api/customers - Get all customers
- GET /api/customers/:id - Get single customer
- POST /api/customers - Create new customer
- PUT /api/customers/:id - Update customer
- DELETE /api/customers/:id - Delete customer

### Contacts
- GET /api/contacts/customer/:customerId - Get all contacts for a customer
- POST /api/contacts - Create new contact
- PUT /api/contacts/:id - Update contact
- DELETE /api/contacts/:id - Delete contact

## Security

- All routes except login are protected with JWT authentication
- Passwords are hashed using bcrypt
- CORS is enabled for the frontend domain

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 