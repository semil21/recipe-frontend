import React, { useEffect, useState } from "react";
import "../css/App.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../store/slice/categorySlice";
import slugify from "react-slugify";

function EditCategory() {
  const [categoryData, setCategoryData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken = useSelector((state) => state.auth.token);
  // console.log("authToken : ", authToken);

  const [selectedImage, setSelectedImage] = useState("");

  var { categoryId } = useParams();

  // console.log("category id : ", categoryId);

  //  sends  field data
  // const fromData = useSelector((state) => state.category);

  //  handles change
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "img_Base64") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          setSelectedImage(base64Image);
          setFormData({
            ...formData,
            [name]: base64Image,
          });
        };
        reader.readAsDataURL(file);
      }
    } else if (name === "name") {
      // const categorySlug = slugify(value, { delimiter: "_" });
      setFormData({
        ...formData,
        [name]: value,
        slug: slugify(value, { delimiter: "_" }),
      });
    } else {
      // For other fields (name, subName, description), update directly in formData
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // for fetching records from ID
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/category/getCategory?_id=${categoryId}`
        );
        // console.log("edit category data : ", response.data);

        setCategoryData(response.data.category);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [categoryId]);

  // submitting form
  const onHandleSubmmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("121212", formData);
      const response = await axios.put(
        `http://localhost:8000/category/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `${authToken}`,
          },
          withCredentials: false,
        }
      );
      // const request = new Request(
      //   `http://localhost:8000/category/${categoryId}`
      // );
      // const requestOptions = {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `${authToken}`,
      //   },
      //   body: fromData,
      // };
      // console.log(fromData);
      // const response = await fetch(
      //   `http://localhost:8000/category/${categoryId}`,
      //   requestOptions
      // );
      // console.log("Updated Category Data ", response);
      navigate("/dashboard/category");
    } catch (error) {
      console.log("Updated Category Data :", error);
    }
  };

  // Use local state for form data
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    img_Base64: "",
    subName: "",
    description: "",
  });

  // Update local state with the fetched category data
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        slug: categoryData.slug,
        img_Base64: categoryData.img_Base64,
        subName: categoryData.subName,
        description: categoryData.description,
      });
    }
  }, [categoryData]);

  return (
    <>
      {categoryData ? (
        <div>
          <center className="my-5">
            <h1>Edit Category Data</h1>
          </center>

          {/* <p>Name: {categoryData.name}</p>
          <p>Slug: {categoryData.slug}</p>
          <p>Description: {categoryData.description}</p> */}
          <div className="category-class">
            <form className="mx-auto " onSubmit={onHandleSubmmit}>
              <div className="form-group row">
                <label
                  htmlFor="categoryName"
                  className="col-sm-2 col-form-label"
                >
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
                <label
                  htmlFor="categorySlug"
                  className="col-sm-2 col-form-label"
                >
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
                <label
                  htmlFor="bannerImage"
                  className="col-sm-2 col-form-label"
                >
                  Banner Image :
                </label>
                <div className="col-sm-5">
                  <input
                    type="file"
                    className="form-control"
                    id="img_Base64"
                    name="img_Base64"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <img
                  value={formData.img_Base64}
                  src={selectedImage || categoryData.img_Base64}
                  alt={categoryData.name}
                  style={{ maxHeight: "250px", maxWidth: "300px" }}
                />
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
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
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
                  type="submit"
                  className="btn btn-success"
                  // onClick={onHandleSubmmit}
                >
                  Submit
                </button>
              </center>
            </form>
            <br />
            <br />
          </div>
        </div>
      ) : (
        <p>Loading category data...</p>
      )}

      {/* ============= */}

      {/* {categoryData.length > 0 ? (
        categoryData.map((categoryItem) => (
          <div key={categoryItem._id}>
            <h2>Edit Category: {categoryItem.name}</h2>
            <p>Name: {categoryItem.name}</p>
            <p>Slug: {categoryItem.slug}</p>
            <p>Description: {categoryItem.description}</p>
          </div>
        ))
      ) : (
        <p>Loading category data...</p>
      )} */}
    </>
  );
}

export default EditCategory;
