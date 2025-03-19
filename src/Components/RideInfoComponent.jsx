import React, { useState } from "react";
import myImage from "../assets/suv.jpg";
import "../assets/suv.jpg";
import FormGroup from "./FormComponent";

export default function RideInComponent() {
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

    const locations = [
        { value: "", text: "Select a Location", disabled: true },
        { value: "New York, NY", text: "New York, NY" },
        { value: "Los Angeles, CA", text: "Los Angeles, CA" },
        { value: "Chicago, IL", text: "Chicago, IL" },
        { value: "Houston, TX", text: "Houston, TX" },
        { value: "Phoenix, AZ", text: "Phoenix, AZ" }
    ];

    const services = [
        { value: "", text: "Select an Action", disabled: true },
        { value: "airport", text: "Airport" },
        { value: "Hotel", text: "Hotel" },
        { value: "City", text: "City" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "passengers" || name === "luggage"
                    ? parseInt(value, 10) || 1
                    : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setVehicles([]);
        setTotalMileage(null);

        try {
            const response = await fetch(
                "https://ride-reservation.vercel.app/api/rides",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
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
                    <FormGroup
                        label="Service Type:"
                        type="select"
                        id="crypto-key"
                        className="form-select"
                        name="serviceType"
                        value={formData.key}
                        placeholder="Enter the encryption key"
                        onChange={handleChange}
                        options={services}
                        required
                    />
                    <div className="form-grid">
                        <FormGroup
                            label="Pickup Date"
                            type="date"
                            id="crypto-key"
                            className="form-select"
                            name="pickupDate"
                            value={formData.pickupDate}
                            placeholder="Select Pickup Date"
                            onChange={handleChange}
                            required
                        />
                        <FormGroup
                            label="Pickup Time"
                            type="time"
                            id="crypto-key"
                            className="form-select"
                            name="pickupTime"
                            value={formData.pickupTime}
                            placeholder="Select Pickup Time"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <FormGroup
                        label="Pickup Location"
                        type="select"
                        id="crypto-key"
                        className="form-select"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        placeholder="Select Pickup Location"
                        onChange={handleChange}
                        options={locations}
                        required
                    />
                    <FormGroup
                        label="Dropoff Location"
                        type="select"
                        id="crypto-key"
                        className="form-select"
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        placeholder="Select Pickup Location"
                        onChange={handleChange}
                        options={locations}
                        required
                    />
                    <div className="form-grid">
                        <FormGroup
                            label="Passenger"
                            type="number"
                            id="crypto-key"
                            className="form-select"
                            name="passengers"
                            value={formData.passengers}
                            placeholder="Select Total Passengers"
                            onChange={handleChange}
                            required
                        />

                        <FormGroup
                            label="luggage"
                            type="number"
                            id="crypto-key"
                            className="form-select"
                            name="luggage"
                            value={formData.luggage}
                            placeholder="Select Total Luggage"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Select Vehicle
                    </button>
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
                                    <p className="vehicle-card-text">
                                        Luggage: {vehicle.luggage}
                                    </p>
                                    <p className="vehicle-card-price">
                                        Price: ${vehicle.price.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {totalMileage !== null && (
                    <div className="mileage-container">
                        Total Mileage:{" "}
                        <span className="mileage-value">{totalMileage} miles</span>
                    </div>
                )}
            </div>
        </div>
    );
}
