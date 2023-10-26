import React from "react";
import logo from "../images/logo.png";
import Category from "./Category";
import Recipe from "./Recipe";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "../css/App.css";
import { useLocation } from "react-router-dom";
import { setToken, clearToken } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import UserSide from "./UserSide";

function SideNav() {
  const location = useLocation();
  const isCategoryRoute = location.pathname === "/dashboard/category";
  const isRecipeRoute = location.pathname === "/dashboard/recipe";

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token from Redux store and localStorage on logout
    dispatch(clearToken());
    localStorage.removeItem("authorizeToken");
  };
  return (
    // <BrowserRouter>
    <>
      {/* </BrowserRouter> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <img
                  src={logo}
                  alt="hugenerd"
                  width="150"
                  height="150"
                  className="rounded-circle mx-3"
                />
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <Link
                    to="/dashboard/category"
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Category</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard/recipe"
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>
                    {""}
                    <span className="ms-1 d-none d-sm-inline">Recipe</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard/user-side"
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>
                    {""}
                    <span className="ms-1 d-none d-sm-inline">User Side </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline"
                      style={{ color: "red" }}
                      onClick={handleLogout}
                    >
                      Logout &nbsp;
                      <i className="bi bi-box-arrow-right"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
