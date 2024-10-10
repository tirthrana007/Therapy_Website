import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import fetchData from "../helper/apiCall";
import Loading from "./Loading"; // Assuming you have a loading component
import "../styles/bookappointment.css"; // Assuming you have the appropriate styles

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const BookAppointment = ({ setModalOpen, ele }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
    email: "", // Added email field in form details
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Local loading state

  // Fetch appointments
  const getAllAppoint = async () => {
    try {
      const response = await fetchData(`/appointment/getallappointments`);
      setAppointments(response);
    } catch (error) {
      toast.error("Error fetching appointments.");
    }
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (!formDetails.date || !formDetails.time || !formDetails.email) {
      toast.error("Date, time, and email are required.");
      return;
    }

    try {
      setLoading(true); // Start loading
      await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: ele?.userId?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
            email: formDetails.email, // Include email in the request
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      // Send email notification
      await axios.post('http://localhost:1000/send-email', {
        to: formDetails.email, // Use the email from formDetails
        doctor: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
        date: formDetails.date,
        time: formDetails.time,
      });

      toast.success("Email sent successfully");
      setModalOpen(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error booking appointment.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 10; i <= 18; i++) {
      slots.push(`${i}:00`);
    }

    return slots.filter((slot) => {
      const booked = appointments.find(
        (appointment) =>
          appointment.date === formDetails.date && appointment.time === slot
      );
      return !booked;
    });
  };

  const timeSlots = generateTimeSlots();

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="modal flex-center">
      <div className="modal__content">
        <h2 className="page-heading">Book Appointment</h2>
        <div className="register-container flex-center book">
          {loading ? (
            <Loading /> // Show loading component while loading
          ) : (
            <form className="register-form" onSubmit={bookAppointment}>
              <input
                type="date"
                name="date"
                className="form-input"
                value={formDetails.date}
                onChange={(e) => setFormDetails({ ...formDetails, date: e.target.value })}
                min={getTodayDate()}
                required
              />
              <select
                name="time"
                className="form-input"
                value={formDetails.time}
                onChange={(e) => setFormDetails({ ...formDetails, time: e.target.value })}
                required
              >
                <option value="" disabled>Select Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <input
                type="email" // Changed to email type
                name="email"
                className="form-input"
                placeholder="Your Email"
                value={formDetails.email}
                onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })}
                required
              />
              <h4 className="payment-heading">Payment Details</h4>
              <input
                type="text"
                name="cardNumber"
                className="form-input"
                placeholder="Card Number"
                value={formDetails.cardNumber}
                onChange={(e) => setFormDetails({ ...formDetails, cardNumber: e.target.value })}
                required
              />
              <input
                type="text"
                name="expiryDate"
                className="form-input"
                placeholder="MM/YY"
                value={formDetails.expiryDate}
                onChange={(e) => setFormDetails({ ...formDetails, expiryDate: e.target.value })}
                required
              />
              <input
                type="text"
                name="cvv"
                className="form-input"
                placeholder="CVV"
                value={formDetails.cvv}
                onChange={(e) => setFormDetails({ ...formDetails, cvv: e.target.value })}
                required
              />
              <button type="submit" className="btn form-btn">
                Book and Pay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
