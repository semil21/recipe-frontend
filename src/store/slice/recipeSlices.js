import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "",
  bannerImage: "",
  subHeading: "",
  description: "",
  recipeName: "",
  recipeSlug: "",
  recipeImage: "",
  recipeDescription: "",
  cookingTime: "",
  additionalNote: "",
  ingredients: [{ quantity: "", name: "", unit: "", extraNote: "" }],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addIngredient(state) {
      state.ingredients.push({
        quantity: "",
        name: "",
        unit: "",
        extraNote: "",
      });
    },
    updateIngredientField(state, action) {
      const { index, field, value } = action.payload;
      state.ingredients[index][field] = value;
    },
  },
});

export const { updateField, addIngredient, updateIngredientField } =
  recipeSlice.actions;

export default recipeSlice.reducer;
