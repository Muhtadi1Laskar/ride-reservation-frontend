import React, { useState } from "react";
import myImage from "./assets/suv.jpg";
import "./app.css";

export default function App() {
  const [formData, setFormData] = useState({
    serviceType: "airport",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    passengers: 1,
    luggage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [totalMileage, setTotalMileage] = useState(null);

  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "passengers" || name === "luggage" ? parseInt(value, 10) || 1 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVehicles([]);
    setTotalMileage(null);

    try {
      const response = await fetch("https://ride-reservation.vercel.app/api/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      setVehicles(result.vehicle || []);
      setTotalMileage(result.totalMileage || null);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Ride Reservation</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <label className="form-label">
            Service Type
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="form-select">
              <option value="airport">Airport</option>
              <option value="city">City</option>
              <option value="hotel">Hotel</option>
            </select>
          </label>
          <div className="form-grid">
            <label className="form-label">
              Pickup Date
              <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Pickup Time
              <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="form-input" required />
            </label>
          </div>
          <label className="form-label">
            Pickup Location
            <input type="text" placeholder="Select Pickup Location" name="pickupLocation" list="locations" value={formData.pickupLocation} onChange={handleChange} className="form-input" required />
            <datalist id="locations">
              {locations.map((loc, index) => (
                <option key={index} value={loc} />
              ))}
            </datalist>
          </label>
          <label className="form-label">
            Dropoff Location
            <input type="text" name="dropoffLocation" placeholder="Select Dropoff Location" list="locations" value={formData.dropoffLocation} onChange={handleChange} className="form-input" required />
          </label>
          <div className="form-grid">
            <label className="form-label">
              Passengers
              <input type="number" name="passengers" min="1" max="10" value={formData.passengers} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Luggage
              <input type="number" name="luggage" min="1" max="10" value={formData.luggage} onChange={handleChange} className="form-input" required />
            </label>
          </div>
          <button type="submit" className="submit-button">Select Vehicle</button>
        </form>
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        )}
        {vehicles.length > 0 && (
          <div className="vehicles-container">
            <h3 className="vehicles-title">Available Vehicles</h3>
            <div className="vehicle-card-grid">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="vehicle-card">
                  <img
                    src={myImage} // Assuming each vehicle has imageUrl
                    alt={`${vehicle.name} image`}
                    className="vehicle-image"
                  />
                  <h4 className="vehicle-card-title">Car: {vehicle.name}</h4>
                  <p className="vehicle-card-text">Type: {vehicle.type}</p>
                  <p className="vehicle-card-text">Seats: {vehicle.seats}</p>
                  <p className="vehicle-card-text">Luggage: {vehicle.luggage}</p>
                  <p className="vehicle-card-price">Price: ${vehicle.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {totalMileage !== null && (
          <div className="mileage-container">
            Total Mileage: <span className="mileage-value">{totalMileage} miles</span>
          </div>
        )}
      </div>
    </div>
  );
}