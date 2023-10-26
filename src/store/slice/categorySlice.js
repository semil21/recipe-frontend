import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    name: "", // category name
    slug: "", // category slug
    img_Base64: "", // banner image
    subName: "", // sub heading
    description: "", // description
    categories: [],
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        (category) => category._id !== categoryId
      );
    },
  },
});

export const { updateField, submitCategory, getCategories, deleteCategory } =
  categorySlice.actions;

// for fetching category records
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/category/?limit=10"
    );
    dispatch(getCategories(response.data.categories));
  } catch (error) {
    console.log("Category data table error :", error);
  }
};

// export const deleteCategoryRecord = async (dispatch, categoryId) => {
export const deleteCategoryRecord = (categoryId) => async (dispatch) => {
  const lsAuthKey = localStorage.getItem("authorizeToken ");
  // console.log("lsAuthKey :", lsAuthKey);

  // console.log("categoryId : ", categoryId);  /* undefined */

  try {
    const response = axios
      .delete(`http://localhost:8000/category/${categoryId}`, {
        headers: {
          Authorization: lsAuthKey,
        },
        // withCredentials: false,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(deleteCategory(categoryId));
        }
        console.log("delete response :", response);
      });
  } catch (error) {
    console.log("error in deleting category :", error);
  }
};

export default categorySlice.reducer;
