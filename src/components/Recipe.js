import React, { useState, useEffect } from "react";
import slugify from "react-slugify";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipeField,
  addIngredient,
  submitRecipeData,
} from "../store/slice/recipeSlice";

import axios from "axios";
import RecipeTable from "./RecipeTable";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

function Recipe() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // use states =========================================

  const [recipeName, setRecipeName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // for adding empty ingredient input
  const [ingredients, setIngredients] = useState([
    { quantity: "", unit: "", name: "", extraNote: "" },
  ]);

  // for auth token =========================================

  const authToken = useSelector((state) => state.auth.token);
  console.log("authorization token : ", authToken);

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

  // use to send data to redux store
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

    axios
      .post("http://localhost:8000/recipe/", formData, {
        headers: {
          Authorization: ` ${authToken}`,
        },
      })

      .then((response) => {
        console.log("server response :", response);
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
        console.log("categories from api : ", response.data.categories);
      })
      .catch((error) => {
        console.log("category api error :", error);
      });
  }, []);

  const handleAddRecipeClick = () => {
    navigate("/dashboard/add-recipe");
  };
  return (
    <>
      <center>
        <h1 className="heading my-3">Recipe Details</h1>
      </center>

      <div className="toggleButton">
        <center>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRecipeClick}
          >
            Add Recipe
          </button>
        </center>
      </div>

      <RecipeTable />
    </>
  );
}

export default Recipe;
