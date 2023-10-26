import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeName: "",
  slug: "",
  recipeImage: "",
  recipeDescription: "",
  cookingTime: "",
  additionalNote: "",
  ingredient: [{ quantity: "", unit: "", name: "", extraNote: "" }],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducer: {
    addFields: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { addFields } = recipeSlice.action;

export default recipeSlice;
