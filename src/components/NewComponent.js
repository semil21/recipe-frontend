import React from "react";
import SideNav from "./SideNav";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function NewComponent() {
  // const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     navigate("/login");
  //   }
  // }, []);

  // console.log("isAuthenticated : ", isAuthenticated);
  return (
    <>
      {/* {isAuthenticated === true && ( */}
      <>
        <SideNav />
        {/* <Outlet /> */}
      </>
      {/* )} */}
    </>
  );
}

export default NewComponent;
