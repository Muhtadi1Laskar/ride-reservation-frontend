import React, { useState } from "react";
import FormGroup from "./FormComponent";
// import "../App.css";

function PaymentForm({ onPaymentSubmit }) {
  const [paymentData, setPaymentData] = useState({
    paymentId: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(paymentData);
  };

  return (
    <div className="payment-form-container">
      <h4 className="payment-form-title">Payment Details</h4>
      <form onSubmit={handleSubmit} className="form-group">
        <FormGroup
          label="Payment Id"
          type="text"
          name="paymentId"
          value={paymentData.paymentId}
          placeholder="Enter the Payment ID"
          className="form-input"
          onChange={handleChange}
          required
        />
        <FormGroup
          label="Amount"
          type="number"
          name="amount"
          value={paymentData.amount}
          placeholder="Enter the Amount"
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
