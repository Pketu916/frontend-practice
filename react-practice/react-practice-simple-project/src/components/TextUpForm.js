import React, { useState } from 'react';

export default function TextUpForm(props) {

    const [text, setText] = useState("Enter text here");

    const hendleUpClick = () => {
        let upText = text.toUpperCase();
        setText(upText)
    }
    const hendleLoClick = () => {
        setText(text.toLowerCase());
    }
    const hendleclearClick = () => {
        setText("");
    }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    document.title = "Text Anaiyze";


    return (
        <>
            <div className={`container my-4 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h1 className="mb-4">Enter the text to analyze below</h1>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="exampleTextarea"
                        rows="5"
                        value={text}
                        onChange={handleOnChange}
                    ></textarea>
                </div>
                <button className="btn btn-primary mt-2 mx-2" onClick={hendleUpClick}>Convert to upper case</button>
                <button className="btn btn-primary mt-2 mx-2" onClick={hendleLoClick}>Convert to lower case</button>
                <button className="btn btn-primary mt-2 mx-2" onClick={hendleclearClick}>Clear</button>
            </div>
            <div className="container my-4">
                <h1>Your Text Summary</h1>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.08 * text.split(" ").length}minutes average reading time</p>
            </div>
        </>

    );
}
