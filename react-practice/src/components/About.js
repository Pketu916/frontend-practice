import { useState } from "react";
import React from 'react';


export default function About(props) {
  const [btnText, setBTnText] = useState("Enable Dark Mode")

  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white"
  });

  const darkMode = () => {
    if (myStyle.color === "black") {
      setMyStyle({
        color: "white",
        backgroundColor: "black"
      });
      setBTnText("Disable Dark Mode")
    } else {
      setMyStyle({
        color: "black",
        backgroundColor: "white"
      });
      setBTnText("Enab le Dark Mode")
    }
  };

  return (
    <div className="container my-5" style={myStyle}>
      <div className={` text-${props.mode === 'dark' ? 'light' : 'dark'}`}  >

        <h1 className="display-4 mb-4" style={myStyle} >About Us</h1>
        <p className="lead" >
          Welcome to our travel and tourism website! Where we're passionate about travel and creating unforgettable experiences.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            Our team of experts curates diverse travel options, ensuring personalized adventures for every traveler.
            From seamless bookings to expert guidance, we're here to make your journey stress-free.
            Join our community of adventurers and let's explore the world together. Your next adventure starts here at travel and tourism.
          </p>
          <h3 className="mt-5">Join Us on This Journey</h3>
          <p>
            Whether you're a seasoned globetrotter or embarking on your first adventure, we invite you to join us on this journey of discovery and exploration.
            Let's create unforgettable memories together!
          </p>
          <p className="mt-4">
            <strong>For inquiries or bookings, contact us at: </strong>
            <a href="mailto:travelandtourism@gmail.com">travelandtourism@gmail.com</a>
          </p>
        </div>
      </div>
      <button className='btn btn-primary' onClick={darkMode} >{btnText}</button>
    </div>
  );
}
