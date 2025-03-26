import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

# Load dataset
file_path = "weather_dataNew.csv"  # Update if needed
weather_df = pd.read_csv(file_path)

# Convert Timestamp to datetime
weather_df["Timestamp"] = pd.to_datetime(weather_df["Timestamp"])

# Select features and target variable
features = ["Humidity (%)", "Pressure (hPa)", "Wind Speed (m/s)"]  # Input (X)
target = "Temperature (°C)"  # Output (y)

X = weather_df[features]
y = weather_df[target]

# Split data into training and testing sets (80% Train, 20% Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize models
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
xgb_model = XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)

# Train models
rf_model.fit(X_train, y_train)
xgb_model.fit(X_train, y_train)

# Make predictions
rf_preds = rf_model.predict(X_test)
xgb_preds = xgb_model.predict(X_test)

# Evaluate models
rf_mae = mean_absolute_error(y_test, rf_preds)
xgb_mae = mean_absolute_error(y_test, xgb_preds)

# Use XGBoost's built-in RMSE function
rf_rmse = np.sqrt(np.mean((y_test - rf_preds) ** 2))  # Corrected RMSE calculation
xgb_rmse = np.sqrt(np.mean((y_test - xgb_preds) ** 2))  # Corrected RMSE calculation
 # XGBoost RMSE function

# Print evaluation metrics
print("Random Forest - MAE:", rf_mae, " RMSE:", rf_rmse)
print("XGBoost - MAE:", xgb_mae, " RMSE:", xgb_rmse)

# Select the best model based on lower RMSE
best_model = rf_model if rf_rmse < xgb_rmse else xgb_model
best_model_name = "Random Forest" if rf_rmse < xgb_rmse else "XGBoost"

print(f"Best model selected: {best_model_name}")

# Save the best model to a .pkl file
pkl_filename = "weather_model.pkl"
with open(pkl_filename, "wb") as file:
    pickle.dump(best_model, file)

print(f"Model saved as {pkl_filename}")
