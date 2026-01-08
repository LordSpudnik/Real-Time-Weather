# Real-Time Weather Website

Welcome to the **Real-Time Weather Website**, a dynamic and user-friendly web application designed to provide accurate weather forecasts, personalized weather alerts, and interactive notifications. This project integrates real-time weather data, machine learning-based temperature predictions, and a robust user authentication system to deliver a seamless experience for weather enthusiasts and casual users alike.

## Project Overview

The Real-Time Weather Website allows users to:
- Check current weather conditions for any city using the OpenWeatherMap API.
- View predicted temperatures for the next 3, 6, and 9 hours using a machine learning model.
- Set custom weather alerts based on temperature thresholds, weather types, and time preferences.
- Receive browser notifications for alert updates, deletions, and errors to enhance user interaction.
- Save favorite cities for quick access.
- Sign up and log in securely to manage their weather preferences.

The application is built with a combination of front-end and back-end technologies, leveraging machine learning for predictive analytics and a cloud-hosted database for user data management.

## Features

- **Real-Time Weather Data**: Fetches current weather details (temperature, humidity, pressure, wind speed) for cities worldwide.
- **Temperature Predictions**: Uses a trained machine learning model (Random Forest or XGBoost) to predict temperatures over the next 9 hours.
- **User Authentication**: Secure login and signup system with MongoDB Atlas for persistent user data storage.
- **Weather Alerts**: Allows users to set alerts for specific weather conditions, stored and managed via a Node.js backend.
- **Browser Notifications**: Provides real-time notifications for successful alert saves, updates, deletions, and errors like invalid phone numbers or server issues.
- **Favorites List**: Users can save and remove favorite cities with a simple UI.
- **Responsive Design**: A sleek and intuitive interface with dynamic background changes based on weather conditions.

## Tools and Technologies

### Backend
- **Python (Flask)**: Powers the machine learning prediction API, serving temperature forecasts based on weather inputs.
- **Node.js (Express)**: Handles user authentication, alert management, and serves the front-end static files.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for storing user credentials and alert preferences.
- **XGBoost & Scikit-learn**: Machine learning libraries used to train and deploy the weather prediction model.
- **Pandas & NumPy**: Data manipulation and preprocessing for the weather dataset.

### Frontend
- **HTML/CSS/JavaScript**: Core technologies for building the user interface and interactivity.
- **Fetch API**: Handles asynchronous requests to the weather API, prediction API, and backend server.
- **Web Notifications API**: Enables browser-based notifications for real-time user feedback.
- **Font Awesome**: Provides icons for a visually appealing interface.

### APIs and Data
- **OpenWeatherMap API**: Provides real-time weather data and forecasts for cities across India and beyond.
- **IPinfo API**: Retrieves the user's city based on their IP address for automatic location detection.
- **Custom Weather Dataset**: A CSV file (`weather_dataNew.csv`) generated from OpenWeatherMap API data, used to train the ML model.

### Deployment
- **Render**: The application is deployed on Render for both the Flask ML server (`rt-weather-ml.onrender.com`) and the Node.js backend (`rt-weather.onrender.com`).
- Visit the live demo:  
  [Deployment Link]([https://rt-weather.onrender.com/])

## Project Structure

- **`app.py`**: Flask application for the machine learning prediction endpoint.
- **`train_model.py`**: Script to train and save the ML model using weather data.
- **`server.js`**: Node.js backend for user authentication and alert management.
- **`fetch_weather_data.py`**: Script to collect weather data from OpenWeatherMap API and save it to a CSV file.
- **`login.js`**: JavaScript for handling login and signup functionality.
- **`myscript.js`**: Main JavaScript file for weather fetching, predictions, notifications, and UI interactions.
- **`index.html`**: Main page for weather display and alert settings.
- **`login.html`**: Login and signup page.
- **`style.css` & `login.css`**: Styling for the main interface and login/signup pages.

## Acknowledgments

- **OpenWeatherMap**: For providing reliable weather data.
- **MongoDB Atlas**: For secure and scalable cloud storage.
- **Render**: For hosting the application seamlessly.

This project is a blend of modern web development, machine learning, and real-time user interaction, showcasing how technology can enhance everyday tools like weather forecasting. Contributions and feedback are welcome!
