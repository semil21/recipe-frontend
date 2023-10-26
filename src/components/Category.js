import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../store/slice/categorySlice";
import slugify from "react-slugify";
import axios from "axios";
import "../css/App.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

import CategoryTable from "./CategoryTable";
import AddCategory from "./AddCategory";

function Category() {
  const navigate = useNavigate();
  /* const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  console.log("authorization token : ", authToken);

  const [selectedImage, setSelectedImage] = useState("");
  const [showForm, setShowForm] = useState(false);*/ // State to toggle the form

  // use state  form data

  // const [formData, setFormData] = useState({
  //   name: "",
  //   slug: "",
  //   img_Base64: "",
  //   subName: "",
  //   description: "",
  // });

  // const toggleForm = () => {
  //   setShowForm(!showForm);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // for category slug

  //   if (name === "name") {
  //     const categorySlug = slugify(value, { delimiter: "_" });
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //       slug: categorySlug,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //       img_Base64: selectedImage,
  //     });
  //   }
  // };

  // converting image to base64

  // const handleImageChange = (event) => {
  //   const imageFile = event.target.files[0];

  //   if (imageFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const base64Url = e.target.result;
  //       console.log("base64Url : ", base64Url);
  //       setSelectedImage(base64Url);
  //       // dispatch(updateField({ field: "bannerImage", value: base64Url }));
  //     };
  //     reader.readAsDataURL(imageFile);
  //   }
  // };

  // for sending data through API

  // const sendInputData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/category",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: ` ${authToken}`,
  //         },
  //       }
  //     );

  //     console.log("server response ", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // submits data and sends to reducer

  // const handleSubmit = () => {
  //   dispatch(updateField(formData));

  //   // for resetting form after submission
  //   setFormData({
  //     name: "",
  //     slug: "",
  //     img_Base64: "",
  //     subName: "",
  //     description: "",
  //   });
  //   sendInputData();
  //   console.log("category : ", formData);

  //   toggleForm();
  // };

  // navidates to add-category

  const handleAddCategoryClick = () => {
    navigate("/dashboard/add-category");
  };
  return (
    <>
      <center>
        <h1 className="heading ">Recipe Category</h1>
      </center>
      <br />

      <div className="toggleButton">
        <center>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddCategoryClick}
          >
            Add Category
          </button>
          <br />
        </center>
      </div>

      {/* {showForm && (
        <div className="category-class">
          <form className="mx-auto ">
            <div className="form-group row">
              <label htmlFor="categoryName" className="col-sm-2 col-form-label">
                Category Name :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Category Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label htmlFor="categorySlug" className="col-sm-2 col-form-label">
                Category Slug :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  value={formData.slug}
                  readOnly
                />
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label htmlFor="bannerImage" className="col-sm-2 col-form-label">
                Banner Image :
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="img_Base64"
                  name="img_Base64"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label htmlFor="subHeading" className="col-sm-2 col-form-label">
                Sub Heading :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="subName"
                  name="subName"
                  placeholder="Enter Sub Heading"
                  value={formData.subName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description :
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="6"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <br />
            <center>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </center>
          </form>
          <br />
          <br />
        </div>
      )}  */}

      <CategoryTable />
    </>
  );
}

export default Category;
