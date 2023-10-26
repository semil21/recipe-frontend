import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./store/slice/categorySlice";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SideNav from "./components/SideNav";
// import recipeReducer from "./store/slice/recipeSlice";
import recipeSliceReducer from "./store/slice/recipeSlice";
import Login from "./components/Login";
import authReucer from "./store/slice/authSlice";
import { useSelector } from "react-redux";
import NewComponent from "./components/NewComponent";
import Category from "./components/Category";
import Recipe from "./components/Recipe";
import store from "./store/store";
import AddCategory from "./components/AddCategory";
import AddRecipe from "./components/AddRecipe";
import EditCategory from "./components/EditCategory";
import EditRecipe from "./components/EditRecipe";
import UserSide from "./components/UserSide";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  // const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <BrowserRouter>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route index path="/" element={<UserSide />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/recipe-detail/:recipeId/"
              element={<RecipeDetail />}
            />

            <Route path="/dashboard" element={<SideNav />}>
              {/* 
          <Route path="" element={<h2>Home Page</h2>} /> */}
              <Route path="category" element={<Category />} />
              <Route path="recipe" element={<Recipe />} />
              <Route path="/dashboard/add-category" element={<AddCategory />} />
              <Route path="/dashboard/add-recipe" element={<AddRecipe />} />
              <Route path="/dashboard/user-side" element={<UserSide />} />

              {/* for editing category  */}
              <Route
                path="/dashboard/category/edit-category/:categoryId"
                element={<EditCategory />}
              />

              {/* for editing category */}
              <Route
                path="/dashboard/recipe/edit-recipe/:recipeId"
                element={<EditRecipe />}
              />
            </Route>

            {/* for editing recipe */}

            {/* <Route path="/dashboard" element={<SideNav />} /> */}
            {/* {isAuthenticated ? <SideNav /> : navigate("/")} */}
          </Routes>
          {/* <Category /> */}
          {/* <SideNav /> */}
          {/* <RecipeDescription /> */}
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
