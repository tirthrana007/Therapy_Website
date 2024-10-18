import React from "react";
import image from "../images/unnamed.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            At Her Healing Heaven, we believe that every woman deserves a space where she can heal, grow, and thrive. Our mission is to provide women with accessible, personalized therapy options that support their emotional and mental well-being. We understand that life can be overwhelming, and finding the right support shouldn't add to the stress.
<br />
Founded with a vision to create a community of healing, Her Healing Heaven is more than just a therapy platform. We are a sanctuary where women can connect with experienced therapists who offer care, empathy, and understanding. Whether you're seeking help for anxiety, depression, relationship issues, or simply personal growth, we offer therapy tailored to your needs at negotiable rates.
<br />
We are committed to making therapy accessible to women from all walks of life, ensuring that no one is left behind on their journey to healing. At Her Healing Heaven, we believe in the power of empathy, understanding, and support to create lasting change.
<br />
Join us, and take the first step towards a brighter, healthier future.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
