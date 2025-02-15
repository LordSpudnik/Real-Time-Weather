// Use node server.js to run the server

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://SubashVenkat:MongoDBWeatherPass@rt-weather.j3ukj.mongodb.net/UserData';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const alertSchema = new mongoose.Schema({
    city: { type: String, required: true },
    tempThreshold: { type: Number, required: true },
    weatherType: { type: String, required: true },
    alertTime: { type: Number, required: true },
    phoneNumber: { type: String, required: true, unique: true }
});

const Alert = mongoose.model('Alert', alertSchema);

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});