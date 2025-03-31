from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS  # Ensure CORS is enabled
import os

app = Flask(__name__)
CORS(app)  # Allow JavaScript requests from browser

# Load the trained ML model
model_path = "weather_model.pkl"  # Ensure this is in the same directory
with open(model_path, "rb") as file:    
    model = pickle.load(file)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        humidity = float(data["humidity"])
        pressure = float(data["pressure"])
        wind_speed = float(data["wind_speed"])

        # Prepare the input array for ML model
        input_data = np.array([[humidity, pressure, wind_speed]])
        predicted_temp_3h = float(model.predict(input_data)[0])  

        # Apply **progressive, smaller** changes for smoother trends
        input_data_6h = np.array([[humidity * 0.995, pressure * 0.998, wind_speed * 1.015]])  
        predicted_temp_6h = float(model.predict(input_data_6h)[0])  

        input_data_9h = np.array([[humidity * 0.993, pressure * 0.997, wind_speed * 1.02]])  
        predicted_temp_9h = float(model.predict(input_data_9h)[0])  

        # Ensure the differences between predictions are smooth
        if abs(predicted_temp_6h - predicted_temp_3h) > 3:
            predicted_temp_6h = (predicted_temp_3h + predicted_temp_9h) / 2  # Average smoothing

        if abs(predicted_temp_9h - predicted_temp_6h) > 3:
            predicted_temp_9h = predicted_temp_6h + ((predicted_temp_6h - predicted_temp_3h) / 2)  # Trend-based correction

        return jsonify({
            "predicted_temperature_3h": round(predicted_temp_3h, 2),
            "predicted_temperature_6h": round(predicted_temp_6h, 2),
            "predicted_temperature_9h": round(predicted_temp_9h, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
