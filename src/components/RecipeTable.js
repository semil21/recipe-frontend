import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecipeField } from "../store/slice/recipeSlice";
import "../css/App.css";

function RecipeTable() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  const authToken = useSelector((state) => state.auth.token);

  // const authToken = localStorage.getItem("authorizeToken");

  console.log(" recipe table authToken :", authToken);

  const editHandler = (recipeId) => {
    console.log("Clicked Edit Button");

    navigate(`/dashboard/recipe/edit-recipe/${recipeId}`);
  };

  const deleteHandle = (recipeId) => {
    // console.log("clicked delete ");

    const confirmDelete = window.confirm("Are you to delete this recipe ?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/recipe/${recipeId}`, {
          headers: {
            Authorization: `${authToken}`,
            // Authorization: authToken,
          },
        })

        .then((response) => {
          if (response.status === 200) {
            const updatedRecipes = recipe.filter((r) => r._id !== recipeId);
            // setRecipeField({ field: "recipes", value: updatedRecipes })
            setRecipe(updatedRecipes);
            dispatch();
            // dispatch(
            //   setRecipeField({
            //     field: "recipes",
            //     value: recipe.filter((r) => r._id !== recipeId),
            //   })
            // );
          }
        })
        .catch((error) => {
          console.log("recipe delete error :", error);
        });
    }
  };

  // for recipe data
  useEffect(() => {
    async function handleData() {
      const response = await axios.get("http://localhost:8000/recipe/");

      console.log("Recipe Table Data :", response.data.recipes);
      if (Array.isArray(response.data.recipes)) {
        setRecipe(response.data.recipes);
      } else {
        console.error("No record found");
      }
    }

    handleData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/category/")
      .then((response) => {
        setCategories(response.data.categories);
        // console.log("categories from api : ", response.data.categories);
      })
      .catch((error) => {
        console.log("category api error :", error);
      });
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  return (
    <>
      <br />
      <div className="overflow" style={{ overflowX: "scroll" }}>
        <table
          id="example"
          className="table table-striped  table-bordered "
          style={{ width: "100%" }}
        >
          <thead className="table-dark text-center">
            <tr>
              <td style={{ minWidth: "100px" }}>Category </td>
              <td style={{ minWidth: "100px" }}>Name</td>
              {/* <td>Slug</td> */}
              <td style={{ minWidth: "100px" }}>Image</td>
              <td style={{ minWidth: "100px" }}>Description</td>
              <td style={{ minWidth: "100px" }}>Cooking Time</td>
              <td style={{ minWidth: "100px" }}>Additional Note</td>
              <td style={{ minWidth: "100px" }}>Ingredients </td>
              <td style={{ minWidth: "100px" }}>Action</td>
            </tr>
          </thead>
          <tbody>
            {recipe.slice(startIndex, endIndex).map((recipeData, index) => (
              <tr key={index}>
                <td>
                  <ul>
                    {recipeData.categoryId.map((categoy, index) => (
                      <li key={index}> {categoy.name}</li>
                    ))}
                  </ul>

                  {/* {recipeData.categoryId.name} */}
                </td>
                <td>{recipeData.name}</td>
                {/* <td>{recipeData.slug}</td> */}
                <td>
                  <img
                    src={recipeData.img_Base64}
                    style={{ maxHeight: "121px", maxWidth: "130px" }}
                    alt={recipeData.name}
                  ></img>
                  {/* {recipeData.img_Base64} */}
                </td>
                <td>{recipeData.description}</td>
                <td>{recipeData.cookingTime}</td>
                <td>{recipeData.additionalNotes}</td>
                <td>
                  <ul>
                    {recipeData.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.quantity} {ingredient.unit}{" "}
                        {ingredient.name} {ingredient.extraNote}
                      </li>
                    ))}
                  </ul>
                </td>
                {/* {recipeData.} */}

                <td className="button-class">
                  <button
                    type="button"
                    className="btn btn-success mx-2 "
                    onClick={() => editHandler(recipeData._id)}
                    style={{ width: "69px" }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => deleteHandle(recipeData._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center my-3">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(recipe.length / recipesPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(recipe.length / recipesPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default RecipeTable;
