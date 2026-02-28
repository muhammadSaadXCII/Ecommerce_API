# E-Commerce API

This is the backend API for an e-commerce platform. It provides endpoints for managing products, users, and orders.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running the application

To run the application in development mode, run:

```bash
npm run dev
```

To run the application in production, run:

```bash
npm start
```

## API Endpoints

The following are the available API endpoints:

* **User Routes:** `/api/auth`
* **Product Routes:** `/api/products`
* **Order Routes:** `/api/orders`

## Folder Structure

```
/
|-- config/
|   |-- db.js           # Database connection configuration
|-- controllers/
|   |-- orderController.js      # Logic for handling order-related requests
|   |-- productController.js    # Logic for handling product-related requests
|   |-- userController.js       # Logic for handling user-related requests
|-- middlewares/
|   |-- authMiddleware.js       # Middleware for authentication
|   |-- rateLimitMiddleware.js  # Middleware for rate limiting
|-- models/
|   |-- order.js                # Mongoose model for orders
|   |-- product.js              # Mongoose model for products
|   |-- user.js                 # Mongoose model for users
|-- routes/
|   |-- orderRoutes.js          # Routes for order-related endpoints
|   |-- productRoutes.js        # Routes for product-related endpoints
|   |-- userRoutes.js           # Routes for user-related endpoints
|-- server.js                   # Main server file
|-- package.json
|-- package-lock.json
```

## Technologies Used

* **Node.js:** A JavaScript runtime environment that allows running JavaScript on the server.
* **Express:** A web application framework for Node.js, used for building APIs and web applications.
* **MongoDB:** A NoSQL database used to store application data in a flexible, JSON-like format.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data.
* **bcrypt:** A library for hashing passwords, which helps in securely storing user credentials.
* **JSON Web Token (JWT):** A standard for creating access tokens that are used for authenticating and authorizing users.
* **cors:** A Node.js package that provides a middleware for enabling Cross-Origin Resource Sharing (CORS) in Express applications.
* **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
* **express-rate-limit:** A middleware for Express that helps in limiting repeated requests to public APIs and/or endpoints.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
