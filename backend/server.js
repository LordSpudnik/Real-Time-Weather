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
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const alertSchema = new mongoose.Schema({
    city: String,
    tempThreshold: Number,
    weatherType: String,
    alertTime: Number,
    phoneNumber: String
});

const Alert = mongoose.model('Alert', alertSchema);

app.post('/api/setAlert', async (req, res) => {
    try {
        const { city, tempThreshold, weatherType, alertTime, phoneNumber } = req.body;

        const newAlert = new Alert({
            city,
            tempThreshold,
            weatherType,
            alertTime,
            phoneNumber
        });

        await newAlert.save();
        res.status(201).json({ message: 'Alert saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save alert' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});