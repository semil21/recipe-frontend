import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";

function UserSide() {
  const [recipe, setRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // gets recipe data
  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/recipe/");
      if (Array.isArray(response.data.recipes)) {
        setRecipe(response.data.recipes);
      } else {
        console.error("No records found");
      }
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  };

  // fwtches data when input is empty
  // useEffect(() => {
  //   fetchAllRecipes();
  // }, []);

  // gets category data
  useEffect(() => {
    axios
      .get("http://localhost:8000/category/")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log("Category API error:", error);
      });
  }, []);

  // for changing state in input field
  useEffect(() => {
    if (searchRecipe === "") {
      fetchAllRecipes();
    }
  }, [searchRecipe]);

  // Handle search
  const handleSearch = async () => {
    if (searchRecipe) {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe?searchTerm=${searchRecipe}`
        );
        if (Array.isArray(response.data.recipes)) {
          setRecipe(response.data.recipes);
        } else {
          setRecipe(["No Records Found"]);
        }
      } catch (error) {
        console.log("Error in searching recipe:", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipePage = recipe.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Header />
      <div className="user-side">
        <div className="search-box my-5">
          <input
            className="search-input"
            type="text"
            placeholder="Search something.."
            onChange={(e) => setSearchRecipe(e.target.value)}
            value={searchRecipe}
          />
          <button className="search-btn mx -5" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Select Category</label>
          <div className="col-sm-10">
            <select
              multiple
              className="form-control"
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                setSelectedCategories(selectedOptions);
              }}
            >
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipe cards  */}
        <div className="row my-5">
          {currentRecipePage
            .filter((recipeData) => {
              if (selectedCategories.length === 0) {
                return true;
              } else {
                return recipeData.categoryId.some((category) =>
                  selectedCategories.includes(category.name)
                );
              }
            })
            .map((recipeData) => (
              <div className="col-md-4 mx2 my-3" key={recipeData._id}>
                <div className="card">
                  <img
                    src={recipeData.img_Base64}
                    alt={recipeData.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipeData.name}</h5>
                    <Link to={`/recipe-detail/${recipeData._id}`}>
                      <button type="button" className="btn btn-primary my-1">
                        More Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Recipe ends  */}
        <nav aria-label="...">
          <ul className="pagination justify-content-center ">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                tabIndex="-1"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(recipe.length / itemsPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(recipe.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <a
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        <br />
      </div>
    </>
  );
}

export default UserSide;
