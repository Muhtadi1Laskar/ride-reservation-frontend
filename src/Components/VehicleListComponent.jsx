// VehicleList.js
import React from "react";
import myImage from "../assets/suv.jpg";

function VehicleList({ vehicles, onVehicleSelect }) {
  return (
    <div className="vehicles-container">
      <h3 className="vehicles-title">Available Vehicles</h3>
      <div className="vehicle-card-grid">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-card" onClick={() => onVehicleSelect(vehicle)}>
            <img
              src={myImage}
              alt={`Vehicle image`}
              className="vehicle-image"
            />
            <h4 className="vehicle-card-title">Car: {vehicle.name}</h4>
            <p className="vehicle-card-text">Type: {vehicle.type}</p>
            <p className="vehicle-card-text">Seats: {vehicle.seats}</p>
            <p className="vehicle-card-text">Luggage: {vehicle.luggage}</p>
            <p className="vehicle-card-price">Price: ${vehicle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
