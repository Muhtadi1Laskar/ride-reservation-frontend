import React from 'react';
import jsPDF from 'jspdf';

import "../App.css";

export default function SuccessComponent({ onReset, finalInfo }) {
    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text('Reservation Details', 10, 10);

        // Add reservation details to the PDF
        let y = 30;
        for (const key in finalInfo) {
            if (typeof finalInfo[key] === 'object' && finalInfo[key] !== null) {
                doc.text(`${key}:`, 10, y);
                y += 10;
                for (const subKey in finalInfo[key]) {
                    doc.text(`  ${subKey}: ${finalInfo[key][subKey]}`, 20, y);
                    y += 10;
                }
            } else {
                doc.text(`${key}: ${finalInfo[key]}`, 10, y);
                y += 10;
            }
        }

        doc.save('reservation.pdf');
    };

    return (
        <div className="success-container mobile-friendly">
            <h3 className="success-title">Payment Successful!</h3>
            <p className="success-message">Your ride has been reserved.</p>
            <div className="success-buttons">
                <button className="success-button mobile-button" onClick={onReset}>
                    Create Ride
                </button>
                <button className="success-button mobile-button" onClick={handleDownload}>
                    Download Reservation
                </button>
            </div>
        </div>
    );
}