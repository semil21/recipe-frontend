import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/App.css";
import {
  fetchCategories,
  deleteCategoryRecord,
} from "../store/slice/categorySlice";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function CategoryTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  const { categories = [] } = useSelector((store) => store.category);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:8000/category/?limit=10"
    //     );
    //     console.log("category table response : ", response);
    //     if (Array.isArray(response.data.categories)) {
    //       setCategory(response.data.categories);
    //     } else {
    //       console.error("No record found");
    //     }

    //     // setCategory(response);
    //   } catch (error) {
    //     console.log("Category data table error :", error);
    //   }
    // }

    // fetchData();

    dispatch(fetchCategories());
  }, []);

  // edit button
  const editHandler = (categoryId) => {
    // console.log("Clicked Edit Button");

    navigate(`/dashboard/category/edit-category/${categoryId}`);
  };

  // delete button

  const deleteHanler = (categoryId) => {
    // console.log("Clicked Delete Button");
    // dispatch(deleteCategory(categoryId));

    const confirmDelete = window.confirm(
      "Are you sure to delete this category?"
    );

    if (confirmDelete) {
      // dispatch(deleteCategoryRecord( categoryId, authToken ));
      dispatch(deleteCategoryRecord(categoryId));
    }
    // if (confirmDelete) {
    //   const response = axios
    //     .delete(`http://localhost:8000/category/${categoryId}`, {
    //       headers: {
    //         Authorization: `${authToken}`,
    //       },
    //       withCredentials: false,
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         dispatch(fetchCategories());
    //       }
    //       console.log("delete response :", response);
    //     })
    //     .catch((error) => {
    //       console.log("delete error :", error);
    //     });
    // }
  };

  // for pagination  ========
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = categories.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <br />
      <table
        id="example"
        className="table table-striped table-bordered "
        style={{ width: "100%" }}
      >
        <thead className="table-dark text-center">
          <tr>
            <td>Name</td>
            <td>Slug</td>
            <td>Image</td>
            <td>Sub-Heading</td>
            <td>Description</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((categoryData) => (
            <tr key={categoryData._id}>
              <td>{categoryData.name}</td>
              <td>{categoryData.slug}</td>
              <td>
                <img
                  src={categoryData.img_Base64}
                  alt={categoryData.name}
                  style={{ height: "125px", width: "170px" }}
                ></img>
              </td>
              <td>{categoryData.subName}</td>
              <td>{categoryData.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success mx-2"
                  onClick={() => editHandler(categoryData._id)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteHanler(categoryData._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <nav aria-label="...">
        <ul className="pagination justify-content-center my-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {Array.from({
            length: Math.ceil(categories.length / recordsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(categories.length / recordsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CategoryTable;
