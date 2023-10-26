import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/slice/categorySlice";
import recipeReducer from "../store/slice/recipeSlice";
import authReducer from "../store/slice/authSlice"; // Import your authSlice reducer

const store = configureStore({
  reducer: {
    category: categoryReducer,
    recipe: recipeReducer,
    auth: authReducer,
  },
});

export default store;
