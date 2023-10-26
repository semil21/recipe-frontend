import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/App.css";

function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState([]);
  const [count, setCount] = useState(1);

  //   console.log("recipeId : ", recipeId);

  // gets recipe data
  useEffect(() => {
    async function getRecipeData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/${recipeId}`
        );

        console.log("response : id ", response.data.recipe);

        setRecipeData([response.data.recipe]);
      } catch (error) {
        console.log("error in getting recipe data ", error);
      }
    }

    getRecipeData();
  }, []);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div>
        {recipeData.map((data) => (
          <div key={data._id}>
            <br />
            <br />
            <h1 className="recipe-detail-heading">
              <b> {data.name} </b>
            </h1>
            <br />
            {/* <div className="recipe-detail-container"> */}
            <cexnter>
              <img
                src={data.img_Base64}
                alt={data.name}
                className="recipe-detail-image"
              ></img>
            </cexnter>
            {/* </div> */}
            <br />
            <br />
            <div>
              <p className="recipe-detail-data">
                Category :
                {data.categoryId.map((category) => (
                  <span key={category._id}>&nbsp; {category.name}, </span>
                ))}
              </p>

              <p className="recipe-detail-data">
                Description : {data.description}
              </p>
              <p className="recipe-detail-data">
                Cooking Time : {data.cookingTime}
              </p>
              <p className="recipe-detail-data">
                Additional Notes : {data.additionalNotes}
              </p>
            </div>
            <br />
            <button
              type="button"
              class="btn btn-primary btn-width mx-5"
              // onClick={() => setCount(count - 1)}
              onClick={handleDecrement}
            >
              <span className="counter"> - </span>
            </button>

            <span className="count-detail">
              {" "}
              Serves for : &nbsp; {count} Person{" "}
            </span>

            <button
              type="button"
              class="btn btn-primary  btn-width mx-5"
              onClick={() => setCount(count + 1)}
            >
              <span className="counter"> + </span>
            </button>
            <ul
              className="nav nav-pills mb-3 my-4"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active link-tab"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Ingredients
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link link-tab"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Method
                </button>
              </li>
            </ul>
            <br />
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {data.ingredients.map((ingredient, index) => (
                  <p key={index}>
                    {ingredient.quantity * count} {ingredient.unit}{" "}
                    {ingredient.name} {ingredient.extraNote}
                  </p>
                ))}
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                {data.description}
              </div>
            </div>
            <div className="category-detail">
              <h1 className="my-5">
                <b>More About Category : </b>{" "}
              </h1>

              <p className="category-detail-data">
                Category Name : &nbsp;
                {data.categoryId.map((category) => (
                  <p key={category._id}>{category.name} ,</p>
                ))}
              </p>
              <p className="category-detail-data">
                Category Description : {data.categoryId[0].description}
              </p>
              <p className="category-detail-data">
                Category Sub-Name : {data.categoryId[0].subName}
              </p>
            </div>
            <footer
              className="text-center text-dark"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <div class="text-center text-dark p-3">
                © 2020 Copyright : &nbsp;
                <a class="text-dark">CookingBook.com</a>
              </div>
            </footer>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecipeDetail;
