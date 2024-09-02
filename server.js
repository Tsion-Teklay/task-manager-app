const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/taskManager_app");
        console.log("Connected to MongoDB");
        await app.listen(3000, () => console.log("Server is running on port 3000"));
    } catch (error) {
        console.log(error.message);
    }
})();
