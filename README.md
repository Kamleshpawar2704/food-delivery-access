# Fresheat - Fresh Food

A modern food delivery application built with React and Vite for the frontend, and Node.js/Express with MongoDB for the backend.

## Frontend

Built with React 19, Vite, and Bootstrap.

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Backend

Built with Node.js, Express, and MongoDB.

### Prerequisites

- Node.js
- MongoDB (install and run locally, or use MongoDB Atlas)

### Getting Started

1. Ensure MongoDB is running locally on default port (27017), or update the `MONGODB_URI` in `backend/.env`.

2. Create a `backend/.env` file with your configuration (see `.env` example).

3. Navigate to the backend directory:
   ```bash
   cd backend
   ```

4. Seed the database with sample data:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`.

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

#### Foods
- `GET /api/foods` - Get all foods
- `POST /api/foods` - Create a new food item (admin only)
- `GET /api/foods/:id` - Get food by ID
- `PUT /api/foods/:id` - Update food (admin only)
- `DELETE /api/foods/:id` - Delete food (admin only)

#### Orders
- `GET /api/orders` - Get orders (user's own or all for admin, requires auth)
- `POST /api/orders` - Create a new order (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth, owner or admin)
- `PUT /api/orders/:id` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

## Project Structure

```
├── src/                 # Frontend source code
├── backend/             # Backend source code
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Main server file
├── public/              # Static assets
└── package.json         # Frontend dependencies
```
