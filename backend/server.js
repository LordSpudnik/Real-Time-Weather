// Use nodemon server.js to run the server

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://SubashVenkat:MongoDBWeatherPass@rt-weather.j3ukj.mongodb.net/UserData";
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const alertSchema = new mongoose.Schema({
    city: { type: String, required: true },
    tempThreshold: { type: Number, required: true },
    weatherType: { type: String, required: true },
    alertTime: { type: Number, required: true },
    phoneNumber: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);
const Alert = mongoose.model('Alert', alertSchema);

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        return res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const newUser = new User({
            username,
            password
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.post('/api/setAlert', async (req, res) => {
    try {
        const { city, tempThreshold, weatherType, alertTime, phoneNumber, update } = req.body;

        if (!city || !tempThreshold || !weatherType || !alertTime || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingAlert = await Alert.findOne({ phoneNumber });
        if (existingAlert) {
            if (update) {
                existingAlert.city = city;
                existingAlert.tempThreshold = tempThreshold;
                existingAlert.weatherType = weatherType;
                existingAlert.alertTime = alertTime;

                await existingAlert.save();
                return res.status(200).json({ message: 'Alert updated successfully!' });
            } else {
                return res.status(409).json({ message: 'Alert already exists for this phone number. Do you want to update it?' });
            }
        } else {
            const newAlert = new Alert({
                city,
                tempThreshold,
                weatherType,
                alertTime,
                phoneNumber
            });

            await newAlert.save();
            return res.status(201).json({ message: 'Alert saved successfully!' });
        }
    } catch (error) {
        console.error('Error saving alert:', error);
        res.status(500).json({ error: 'Failed to save alert' });
    }
});

app.delete('/api/deleteAlert', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const alert = await Alert.findOneAndDelete({ phoneNumber });

        if (!alert) {
            return res.status(404).json({ error: "Entered Phone Number doesn't have an alert" });
        }

        return res.status(200).json({ message: 'Alert deleted successfully!' });
    } catch (error) {
        console.error('Error deleting alert:', error);
        res.status(500).json({ error: 'Failed to delete alert' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on https://rt-weather.onrender.com:${PORT}`);
});