import { useState } from "react";

export default function RideReservationForm() {
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
      console.log(result);
      setVehicles(result.vehicle || []);
      setTotalMileage(result.totalMileage || null);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ride Reservation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block font-medium text-lg">
            Service Type
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg">
              <option value="airport">Airport</option>
              <option value="city">City</option>
              <option value="hotel">Hotel</option>
            </select>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block font-medium text-lg">
              Pickup Date
              <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
            </label>
            <label className="block font-medium text-lg">
              Pickup Time
              <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
            </label>
          </div>
          <label className="block font-medium text-lg">
            Pickup Location
            <input type="text" name="pickupLocation" list="locations" value={formData.pickupLocation} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
            <datalist id="locations">
              {locations.map((loc, index) => (
                <option key={index} value={loc} />
              ))}
            </datalist>
          </label>
          <label className="block font-medium text-lg">
            Dropoff Location
            <input type="text" name="dropoffLocation" list="locations" value={formData.dropoffLocation} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block font-medium text-lg">
              Passengers
              <input type="number" name="passengers" min="1" max="10" value={formData.passengers} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
            </label>
            <label className="block font-medium text-lg">
              Luggage
              <input type="number" name="luggage" min="1" max="10" value={formData.luggage} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" required />
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 text-lg font-semibold">Select Vehicle</button>
        </form>
        {loading && (
          <div className="text-center mt-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-blue-600 text-lg">Loading...</p>
          </div>
        )}
        {vehicles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Vehicles</h3>
            <div className="grid grid-cols-1 gap-6">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="p-6 border rounded-xl shadow-md bg-gray-50 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Car: {vehicle.name}</h4>
                  <p className="text-gray-600 mb-1">Type: {vehicle.type}</p>
                  <p className="text-gray-600 mb-1">Seats: {vehicle.seats}</p>
                  <p className="text-gray-600 mb-1">Luggage: {vehicle.luggage}</p>
                  <p className="text-blue-600 font-bold text-lg">Price: ${vehicle.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {totalMileage !== null && (
          <div className="mt-6 p-4 bg-gray-200 rounded-xl text-center font-semibold text-lg">
            Total Mileage: <span className="text-blue-600">{totalMileage} miles</span>
          </div>
        )}
      </div>
    </div>
  );
}