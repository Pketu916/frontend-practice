import { useState } from "react";
import React from 'react';


export default function About(props) {

  // const [myStyle, setMyStyle] = useState({
  //   color: "black",
  //   backgroundColor: "white"
  // });

  let myStyle = {
    color : props.mode === "dark" ? "white" : "black",
    backgroundcolor: props.mode === "light" ? "black" : "white"
  }

 
  document.title = "Analyzer About";

  return (
    <div className="container my-5" style={myStyle}>
      <div className={` text-${props.mode === 'dark' ? 'light' : 'dark'}`}>

        <h1 className="display-4 mb-4" >About Text Analyzer</h1>
        <p className="lead">
          Welcome to our Text Analyzer web app! Our goal is to help you analyze and get insights from your text.
          Whether you're a writer, student, or researcher, we provide tools that offer a deeper understanding of your content.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            Our app processes your input text, providing detailed analysis such as word count, character count, sentence structure, and readability.
            We aim to simplify content analysis and enhance your writing experience.
            Join our community and start analyzing your text today!
          </p>
          <h3 className="mt-5">Why Choose Our Text Analyzer?</h3>
          <p>
            Whether you're editing a document, writing an article, or analyzing data, our tool helps you improve the quality of your text by providing key insights and metrics.
            Explore the world of content analysis and make your writing more effective with our user-friendly platform.
          </p>
          <p className="mt-4">
            <strong>For feedback or inquiries, contact us at: </strong>
            <a href="mailto:support@textanalyzer.com">support@textanalyzer.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
