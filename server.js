require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const { rateLimiter } = require('./middlewares/rateLimitMiddleware');

const app = express();

connectDB();
const port = parseInt(process.env.PORT);

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});