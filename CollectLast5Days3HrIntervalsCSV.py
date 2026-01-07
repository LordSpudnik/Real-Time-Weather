import requests
import csv
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# OpenWeatherMap API key
api_key = os.getenv("PY_API_KEY")

# List of major cities representing Indian states
cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
    "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
    "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana",
    "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad",
    "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore",
    "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota",
    "Chandigarh", "Guwahati", "Solapur", "Hubballi", "Tiruchirappalli", "Bareilly",
    "Moradabad", "Mysore", "Tiruppur"
]

# API URL format
api_url = "https://api.openweathermap.org/data/2.5/forecast?q={}&appid={}&units=metric"

# Output CSV file
csv_filename = "weather_dataNew.csv"

# Open CSV file and write headers
with open(csv_filename, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Timestamp", "City", "Temperature (°C)", "Humidity (%)", "Pressure (hPa)", "Wind Speed (m/s)", "Weather Description"])
    
    # Fetch weather data for each city
    for city in cities:
        try:
            response = requests.get(api_url.format(city, api_key))
            data = response.json()
            
            if data["cod"] == "200":
                for entry in data["list"]:
                    timestamp = datetime.utcfromtimestamp(entry["dt"]).strftime('%Y-%m-%d %H:%M:%S')
                    temp = entry["main"]["temp"]
                    humidity = entry["main"]["humidity"]
                    pressure = entry["main"]["pressure"]
                    wind_speed = entry["wind"]["speed"]
                    description = entry["weather"][0]["description"]

                    # Write row to CSV
                    writer.writerow([timestamp, city, temp, humidity, pressure, wind_speed, description])

                print(f"Data Collected for {city}")
            else:
                print(f"Error fetching data for {city}: {data['message']}")
        
        except Exception as e:
            print(f"Error processing city {city}: {str(e)}")

print(f"\nWeather data collection complete! Saved to {csv_filename}")
