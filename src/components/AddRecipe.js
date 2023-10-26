import React, { useState, useEffect } from "react";
import slugify from "react-slugify";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipeField,
  addIngredient,
  submitRecipeData,
} from "../store/slice/recipeSlice";

import axios from "axios";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

function AddRecipe() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // use states =========================================

  const [recipeName, setRecipeName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const lsAuthKey = localStorage.getItem("authorizeToken");
  // console.log("lsAuthKey ====", lsAuthKey);
  // for adding empty ingredient input
  const [ingredients, setIngredients] = useState([
    { quantity: "", unit: "", name: "", extraNote: "" },
  ]);

  // for auth token =========================================

  const authToken = useSelector((state) => state.auth.token);
  // console.log("authorization token : ", authToken);

  // onHandle Events  starts  =========================================

  // adds new empty ingredients inputs
  const handleAddIngredient = () => {
    const newIngredient = { quantity: "", unit: "", name: "", extraNote: "" };
    // adds new ingredient to the Redux store
    dispatch(addIngredient(newIngredient));
    setIngredients([...ingredients, newIngredient]);
  };

  // handle recipe name  +++++
  const handleRecipeChange = (event) => {
    const recipeName = event.target.value;
    setRecipeName(recipeName);

    const slugValue = slugify(recipeName, { delimiter: "_" });
    setSlug(slugValue);

    dispatch(setRecipeField({ field: "recipeName", value: recipeName }));
    dispatch(setRecipeField({ field: "slug", value: slugValue }));
  };

  // handle description  +++++
  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    dispatch(setRecipeField({ field: "description", value: description }));
  };

  // handle image +++++
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target.result;
        console.log("base64Url", base64Url);
        setSelectedImage(base64Url);
        dispatch(setRecipeField({ field: "image", value: base64Url }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle cooking time  +++++
  const handleCookingTimeChange = (event) => {
    const time = event.target.value;

    dispatch(setRecipeField({ field: "cookingTime", value: time }));
  };

  // handle additional note  +++++
  const handleAdditionalNoteChange = (event) => {
    const note = event.target.value;

    dispatch(setRecipeField({ field: "additionalNote", value: note }));
  };

  // handle extra ingredients  +++++
  const handleIngredientChange = (index, field, value) => {
    // creates ingredients copy
    const updatedIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);

    dispatch(
      setRecipeField({ field: "ingredients", value: updatedIngredients })
    );
  };

  // handle category  +++++
  const handleCategoryChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setSelectedCategories(selectedOptions);
  };

  // onHandle Events  ends  =========================================

  // submitting form

  //  sends data to redux store
  const recipeData = useSelector((state) => state.recipe);

  // handle submit and sends data to api +++++
  const onHandleSubmit = () => {
    dispatch(submitRecipeData());
    // console.log(recipeData);

    const formData = {
      name: recipeName,
      slug,
      ingredients,
      description: recipeData.description,
      cookingTime: recipeData.cookingTime,
      additionalNotes: recipeData.additionalNote,
      img_Base64: recipeData.image,
      categoryId: selectedCategories,
    };

    if (selectedCategories.length === 0) {
      alert("Select atleast one category");
      return false;
    }
    if (!formData.name) {
      alert("Recipe name is required ");
      return false;
    }
    if (!formData.img_Base64) {
      alert("Please select a image");
      return false;
    }
    if (!formData.description) {
      alert(" Description is required ");
      return false;
    }
    if (!formData.cookingTime) {
      alert(" Cooking Time is required ");
      return false;
    }
    if (!formData.additionalNotes) {
      alert("Additional Notes is required ");
      return false;
    }
    // for (const ingredient of formData.ingredients) {
    //   if (!ingredient.quantity || !ingredient.unit || !ingredient.name) {
    //     alert("All ingredient fields are required");
    //     return;
    //   }
    // }

    console.log("formdata ----", formData);
    axios
      .post("http://localhost:8000/recipe/", formData, {
        headers: {
          Authorization: ` ${lsAuthKey}`,
        },
      })

      .then((response) => {
        console.log("server response :", response);
        navigate("/dashboard/recipe");
      })
      .catch((error) => {
        console.log("server eror :", error);
      });

    console.log("recipe  form submission :", formData);

    setShowForm(false);
  };

  // validations ====================================================
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  // getting category data
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

  return (
    <>
      <div className="App">
        <form className="mx-auto">
          <br />

          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Select Category </label>
            <div className="col-sm-10">
              <select
                multiple
                className="form-control"
                id="exampleFormControlSelect2"
                value={selectedCategories}
                onChange={handleCategoryChange}
              >
                {/* <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
              <option value="punjabi">Punjabi</option>
              <option value="southIndian">South Indian</option>
              <option value="mexican">Mexican</option> */}

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
                value={recipeName}
                onChange={handleRecipeChange}
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
                value={slug}
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
                onChange={handleImageChange}
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
                onChange={handleDescriptionChange}
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
                onChange={handleCookingTimeChange}
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
                onChange={handleAdditionalNoteChange}
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
                      id="Quantity"
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
    </>
  );
}

export default AddRecipe;
