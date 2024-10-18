import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Mental Health, <br />
          Our Responsibility
        </h1>
        <h3>Welcome to Her Healing Heaven: <br /> A Sanctuary for Women's Wellness</h3>
        <p>
        At Her Healing Heaven, we are dedicated to providing a safe, supportive space for women to heal and thrive. Our platform connects you with compassionate therapists who understand the unique emotional and mental health needs of women. Whether you're navigating personal challenges, seeking emotional growth, or striving for balance, we offer tailored therapy options at negotiable rates. Your well-being is our priority, and we're here to guide you on a journey of self-discovery and healing.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
