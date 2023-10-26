import React, { useState, useEffect } from "react";
import "../css/App.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/slice/authSlice";

function EditCategory() {
  const [ingredients, setIngredients] = useState([
    { quantity: "", unit: "", name: "", extraNote: "" },
  ]);

  const [categories, setCategories] = useState([]);
  const [recipeData, setRecipeData] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const { recipeId } = useParams();
  // const authToken = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const existingToken = localStorage.getItem("authorizeToken");
  // console.log("++++", existingToken);

  useEffect(() => {
    const setTokenAndFetchData = async () => {
      if (existingToken) {
        await dispatch(setToken(existingToken));
      }
    };
    setTokenAndFetchData();
  }, [dispatch, existingToken]);

  const navigate = useNavigate();
  // const { categoryId } = useParams();
  // console.log("recipeid : ", recipeId);

  // adds empty ingredients input fields
  const handleAddIngredient = () => {
    const newIngredient = { quantity: "", unit: "", name: "", extraNote: "" };
    // adds new ingredient in Redux store
    // dispatch(addIngredient(newIngredient));
    setIngredients([...ingredients, newIngredient]);
  };

  // handles extra ingredients
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // for handling input
  const handleInputChange = (field, value) => {
    if (field === "img_Base64") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target.result;
        setRecipeData({
          ...recipeData,
          [field]: base64Url, // Convert the image to a string
        });
        setSelectedImage(base64Url); // Set the selected image
      };
      reader.readAsDataURL(value);
    } else {
      setRecipeData({
        ...recipeData,
        [field]: value,
      });
    }
  };

  // fetching  categories data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/category/`)
      .then((response) => {
        setCategories(response.data.categories);
        // console.log("categories from api : ", response.data.categories);
      })
      .catch((error) => {
        console.log("category api error :", error);
      });
  }, []);

  // fetching recipe data for edit
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/${recipeId}`
        );
        if (response.data.recipe && typeof response.data.recipe === "object") {
          setRecipeData(response.data.recipe);
          setIngredients(response.data.recipe.ingredients || []);
          setSelectedCategory(
            response.data.recipe.categoryId.map((category) => category._id)
          );
          setSelectedImage(response.data.recipe.img_Base64);
        } else {
          console.error("No record found");
        }

        setSelectedDropdown(response.data.recipe.categoryId);
        // console.log("edit category data : ", response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [recipeId]);

  // console.log("1212 : ", selectedDropdown);

  // updating recipe data and sending in API
  const onHandleSubmit = () => {
    const updateRecipe = {
      name: recipeData.name,
      slug: recipeData.slug,
      ingredients: ingredients,
      description: recipeData.description,
      cookingTime: recipeData.cookingTime,
      additionalNotes: recipeData.additionalNotes,
      img_Base64: selectedImage,
      categoryId: selectedCategory,
    };

    axios
      .put(`http://localhost:8000/recipe/${recipeId}`, updateRecipe, {
        headers: {
          // Authorization: ` ${authToken}`,
          Authorization: `${existingToken}`,
        },
      })
      .then((response) => {
        console.log(" recipe update response : ", response);
        navigate("/dashboard/recipe");
      })
      .catch((error) => {
        console.log("recipe update error : ", error);
      });
  };

  return (
    <>
      {recipeData ? (
        // <p key={recipeData._id}>{recipeData.name}</p>
        <div className="App">
          <form className="mx-auto">
            <br />
            <br />
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                Select Category{" "}
              </label>
              <div className="col-sm-10">
                <select
                  multiple
                  className="form-control"
                  id="exampleFormControlSelect2"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Recipe Name :</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="recipeName"
                  name="recipeName"
                  value={recipeData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Slug :</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  value={recipeData.slug}
                  readOnly
                />
                {/* <p>{slug}</p> */}
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Image :</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  name="recipeImage"
                  id="recipeImage"
                  onChange={(e) =>
                    handleInputChange("img_Base64", e.target.files[0])
                  }
                />
                <img
                  src={recipeData.img_Base64 || selectedImage}
                  alt={recipeData.name}
                  style={{ maxHeight: "250px", maxWidth: "300px" }}
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Description :</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="recipeDescription"
                  rows="6"
                  value={recipeData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Cooking Time :</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="cookingTime"
                  value={recipeData.cookingTime}
                  onChange={(e) =>
                    handleInputChange("cookingTime", e.target.value)
                  }
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Additional Note</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="additionalNote"
                  value={recipeData.additionalNotes}
                  onChange={(e) =>
                    handleInputChange("additionalNotes", e.target.value)
                  }
                />
              </div>
            </div>
            <br />

            <center>
              <h1 className="heading">Add Ingredients</h1>
            </center>
            <br />
            <div id="ingredients" className="container">
              <div className="container mt-4 ">
                {ingredients.map((ingredient, index) => (
                  <div className="row my-3" key={index}>
                    <div className="col">
                      <label className="sr-only">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col">
                      <label className="sr-only">
                        Unit : &nbsp; pc, kg, g, ml, l
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) =>
                          handleIngredientChange(index, "unit", e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <label className="sr-only">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={ingredient.name}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <label className="sr-only">Extra Note</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Extra Note"
                        value={ingredient.extraNote}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "extraNote",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-primary my-3"
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
              </div>
            </div>
            {/* ============================ */}

            <br />

            <center>
              <button
                type="button"
                className="btn btn-success"
                onClick={onHandleSubmit}
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      ) : (
        <p>No record found</p>
      )}
    </>
  );
}

export default EditCategory;
