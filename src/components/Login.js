import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { loginSuccess } from "../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { setToken, clearToken } from "../store/slice/authSlice";

// signup validations =============================================

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2)
    .max(15, "maximum 15 characters are allowed")
    .required("First Name is required"),
  secondName: Yup.string()
    .min(3)
    .max(15, "maximum 15 characters are allowed ")
    .required("Last name is required  "),
  signUpEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  signUpPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Character"
    )
    .required("Password is required "),
});

// localhost:8000/admin/register
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const existingToken = localStorage.getItem("authorizeToken");

    if (existingToken) {
      dispatch(setToken(existingToken));
    }
  }, []);

  // for signup
  const handleSignUp = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:8000/admin/register", values)
      .then((response) => {
        if (response.status === 201) {
          // console.log("server response ", response);
          alert("Sign up Successful");
          // Redirect to login or profile page
          navigate("/dashboard");
          // console.log("authorizeToken :", authorizeToken);
        } else {
          alert("Failed to Sign Up");
          console.log("---", response);
        }
      })
      .catch((error, response) => {
        console.error("Error:", error);
        // alert("Failed to Sign Up");
        // console.log("----- ", response);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // for login

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/admin/login", {
        email,
        password,
      });
      // console.log("response", response);
      dispatch(loginSuccess(response.data));

      const authorizeToken = response.headers.authorization;
      // console.log("authorizeToken : ", authorizeToken);
      // dispatch(setToken(authorizeToken));
      localStorage.setItem("authorizeToken", authorizeToken);

      dispatch(setToken(response.headers.authorization));
      navigate("/dashboard");
    } catch (error) {
      // console.log("Failed to login ", error.message);
      // console.log(error?.response?.data.message);1

      alert(error?.response?.data.message);
    }
  };

  const handleLogout = () => {
    // Clear the token from Redux store and localStorage on logout
    dispatch(clearToken());
    localStorage.removeItem("authorizeToken");
  };

  return (
    <>
      <center className="my-3">
        <img src={logo}></img>
      </center>
      <div className="container my-1">
        <div className="row">
          <div className="col">
            <h1 className="header">Log in</h1>
            <br />
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Enter Email</label>
                <p>mitesh@savaliya.com</p>
                <input
                  type="text"
                  className="form-control my-3"
                  id="logInEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Enter Password</label>
                <p>12345678</p>
                <input
                  type="password"
                  className="form-control my-3"
                  id="logInPassword"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <center>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </center>
            </form>
          </div>
          <div className="col">
            <h1 className="header">Sign Up</h1>
            <br />
            <hr />
            <Formik
              initialValues={{
                firstName: "",
                secondName: "",
                signUpEmail: "",
                signUpPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSignUp}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstName">Enter First Name</label>
                    <Field
                      type="text"
                      className="form-control my-3"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="secondName">Enter Last Name</label>
                    <Field
                      type="text"
                      className="form-control my-3"
                      id="secondName"
                      name="secondName"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="secondName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signUpEmail">Enter Email</label>
                    <Field
                      type="email"
                      className="form-control my-3"
                      id="signUpEmail"
                      name="signUpEmail"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="signUpEmail"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signUpPassword">Enter Password</label>
                    <Field
                      type="password"
                      className="form-control my-3"
                      id="signUpPassword"
                      name="signUpPassword"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="signUpPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <center>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </center>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
