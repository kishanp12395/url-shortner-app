const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: "Node_Express_api" })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB Connection Error:", error));


// Routes
app.use('/api/url', urlRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));