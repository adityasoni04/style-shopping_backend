const express = require('express');
const connectDB = require('./src/config/db'); 
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const otpRoutes = require('./src/routes/otpRoutes');
const productRoutes = require("./src/routes/productRoutes")
const userRoutes = require('./src/routes/userRoutes')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

dotenv.config();

const app = express();

connectDB();

app.use(express.json()); 
app.use(helmet());
app.use(mongoSanitize()); 
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
