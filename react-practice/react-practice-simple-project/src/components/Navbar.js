import React from 'react';
import { Link } from 'react-router-dom';

export default function navbar(props) {
    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`} >
            <a className="navbar-brand" href="#">
                Navbar
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/textUpForm">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {/* <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        Search
                    </button> */}
                    <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark':'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Dark Mode</label>
                    </div>
                </form>
            </div>
        </nav>
    )
}
