import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "../css/App.css";

function Header() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        {/* <a className="navbar-brand">Navbar</a> */}
        <img className="navbar-brand  header-image" src={logo}></img>

        <h3 className="my-2 ">CookingBook.com</h3>
        <form className="form-inline">
          <Link to="/login">
            <button
              className="btn btn-outline-success navbar-light mx-3  my-2 my-sm-0 "
              type="submit"
            >
              Login
            </button>
          </Link>
          <button
            className="btn btn-outline-success mx-3 my-2 my-sm-0 "
            type="submit"
          >
            Sign up
          </button>
        </form>
      </nav>
    </>
  );
}

export default Header;
