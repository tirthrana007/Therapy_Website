import React, { useState } from "react";
import "../styles/contact.css";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, message } = formDetails;

      if (!name || !email || !message) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post(
          "/contact",

          {
            name,
            email,
            message
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Submitting Feedback...",
          success: "Thank You for submitting the Contact Form.",
          error: "Unable to submit Fee",
          loading: "Submitting Form...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section
      className="register-section flex-center"
      id="contact"
    >
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Contact Us</h2>
        <form
          onSubmit={formSubmit}
          //action={`https://formspree.io/f/${process.env.REACT_FORMIK_SECRET}`}
          className="register-form "
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <textarea
            type="text"
            name="message"
            className="form-input"
            placeholder="Enter your message"
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
          ></textarea>

          <button
            type="submit"
            className="btn form-btn"
          >
            send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
