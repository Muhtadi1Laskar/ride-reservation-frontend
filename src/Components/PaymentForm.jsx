import React, { useState } from "react";
import FormGroup from "./FormComponent";

function PaymentForm({ onPaymentSubmit, price }) {
  const [paymentData, setPaymentData] = useState({
    paymentID: "",
    amount: price,
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: name === "amount" ? parseFloat(value, 10) || 1 : value,
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
          name="paymentID"
          value={paymentData.paymentID}
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
        <FormGroup
          label="Email"
          type="input"
          name="email"
          value={paymentData.email}
          placeholder="Enter your email"
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
