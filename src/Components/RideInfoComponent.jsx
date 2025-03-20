import React, { useState, useEffect } from "react";
import "../assets/suv.jpg";
import RideForm from "./RideForm";
import VehicleList from "./VehicleListComponent";
import LoadingSpinner from "./LoadingSpinner";
import MileageDisplay from "./MileageComponent";
import PaymentForm from "./PaymentForm";
import SuccessComponent from "./SuccessComponent";

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalInfo, setFinalInfo] = useState(null);

  useEffect(() => {
    console.log("Updated finalInfo:", finalInfo);
  }, [finalInfo]);

  const resetState = () => {
    setFormData({
      serviceType: "airport",
      pickupDate: "",
      pickupTime: "",
      pickupLocation: "",
      dropoffLocation: "",
      passengers: 0,
      luggage: 0,
    });
    setSelectedVehicle(null);
    setVehicles([]);
    setPaymentSuccess(false);
    setTotalMileage(null);
    setFinalInfo(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "passengers" || name === "luggage"
          ? parseInt(value, 10) || 1
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://ride-reservation.vercel.app/api/rides",
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

  const handleVehicleSelect = (vehicle) => setSelectedVehicle(vehicle);

  const handlePaymentSubmit = async (paymentData) => {
    setLoading(true);
    try {
      const finalData = {
        basicInfo: { ...formData },
        vehicle: { ...selectedVehicle },
        paymentInfo: { ...paymentData },
      };

      const response = await fetch("https://ride-reservation.vercel.app/api/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const apiData = await response.json();
      console.log("🚀 API Response:", apiData);
      setFinalInfo(apiData);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
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
        ) : paymentSuccess ? (
          <SuccessComponent finalInfo={finalInfo} onReset={resetState} />
        ) : (
          <>
            <PaymentForm
              onPaymentSubmit={handlePaymentSubmit}
              price={selectedVehicle?.price}
            />
            {loading && <LoadingSpinner />}
          </>
        )}
      </div>
    </div>
  );
}
