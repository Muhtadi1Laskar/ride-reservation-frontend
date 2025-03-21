import React from "react";
import FormGroup from "./FormComponent";

function RideForm({ formData, handleChange, handleSubmit }) {
    const locations = [
        { value: "", text: "Select a Location", disabled: true },
        { value: "New York, NY", text: "New York, NY" },
        { value: "Los Angeles, CA", text: "Los Angeles, CA" },
        { value: "Chicago, IL", text: "Chicago, IL" },
        { value: "Houston, TX", text: "Houston, TX" },
        { value: "Phoenix, AZ", text: "Phoenix, AZ" },
    ];

    const services = [
        { value: "", text: "Select an Action", disabled: true },
        { value: "Airport", text: "Airport" },
        { value: "Hotel", text: "Hotel" },
        { value: "City", text: "City" },
    ];

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <FormGroup
                label="Service Type:"
                type="select"
                className="form-select"
                name="serviceType"
                value={formData.serviceType}
                placeholder="Select the Service Type"
                onChange={handleChange}
                options={services}
                required
            />
            <div className="form-grid">
                <FormGroup
                    label="Pickup Date"
                    type="date"
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
                    className="form-select"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    min={1}
                    max={10}
                    required
                />

                <FormGroup
                    label="luggage"
                    type="number"
                    className="form-select"
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleChange}
                    min={1}
                    max={10}
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                Select Vehicle
            </button>
        </form>
    );
}

export default RideForm;