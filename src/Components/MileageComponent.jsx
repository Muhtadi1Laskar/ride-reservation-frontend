export default function MileageDisplay({ totalMileage }) {
    return (
        <div className="mileage-container">
            Total Mileage:{" "}
            <span className="mileage-value">{totalMileage.toFixed(3)} miles</span>
        </div>
    );
}