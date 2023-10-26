import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "", //  recipe name
  slug: "", //  recipe slug
  ingredients: [], //  ingredients
  img_Base64: "", //  image
  description: "", //  description
  cookingTime: "", //  cooking time
  additionalNotes: "", //  additional note
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },

    submitRecipeData: (state) => {},
  },
});

export const { setRecipeField, addIngredient, submitRecipeData } =
  recipeSlice.actions;

export default recipeSlice.reducer;
