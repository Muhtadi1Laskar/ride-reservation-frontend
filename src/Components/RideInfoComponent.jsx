import React, { useState } from "react";
import "../assets/suv.jpg";
import FormGroup from "./FormComponent";
import VehicleList from "./VehicleListComponent";
import RideForm from "./RideForm";
import LoadingSpinner from "./LoadingSpinner";
import MileageDisplay from "./MileageComponent";
import PaymentForm from "./PaymentForm";

export default function RideInComponent() {
  const [formData, setFormData] = useState({
    serviceType: "airport",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    passengers: 0,
    luggage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [totalMileage, setTotalMileage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
      setTotalMileage(result.mileage || null);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log(selectedVehicle);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      const finalData = {
        ...formData,
        vehicle: selectedVehicle,
        payment: paymentData,
      };
      console.log(finalData);

      const response = await fetch(
        "https://ride-reservation.vercel.app/api/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      const result = await response.json();
      console.log("Payment result:", result);
      // Handle success (e.g., show confirmation)
    } catch (error) {
      console.error("Payment error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Ride Reservation</h2>
        {!selectedVehicle ? (
          <>
            <RideForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            {loading && <LoadingSpinner />}
            {vehicles.length > 0 && (
              <VehicleList
                vehicles={vehicles}
                onVehicleSelect={handleVehicleSelect}
              />
            )}
            {totalMileage !== null && (
              <MileageDisplay totalMileage={totalMileage} />
            )}
          </>
        ) : (
          <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
        )}
      </div>
    </div>
  );
}
