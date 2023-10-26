// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateField,
//   addIngredient,
//   updateIngredientField,
// } from "../store/slice/recipeSlice";

// import logo from "../images/logo.png";
// // import "./css/App.css";
// import slugify from "react-slugify";
// import axios from "axios";

// function RecipeDescription() {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.recipe);

//   // use for recipe name slug
//   const recipeNameHandler = (e) => {
//     const inputRecipeName = e.target.value;
//     dispatch(updateField({ field: "recipeName", value: inputRecipeName }));

//     // Generate and set the slug in the state variable
//     const slug = slugify(inputRecipeName, { delimiter: "_" });
//     dispatch(updateField({ field: "recipeSlug", value: slug }));
//   };

//   // use for category name slug
//   const categorySlugHandler = (e) => {
//     const categoryText = e.target.value;
//     const slugifyCategoryText = slugify(categoryText, { delimiter: "_" });
//     dispatch(updateField({ field: "categoryName", value: categoryText }));
//     dispatch(
//       updateField({ field: "categorySlug", value: slugifyCategoryText })
//     );
//   };

//   // use to add new fields in ingredients
//   const addField = () => {
//     dispatch(addIngredient());
//   };

//   // adds empty fields in ingredients
//   const handleFieldChange = (index, fieldName, value) => {
//     dispatch(updateIngredientField({ index, field: fieldName, value }));
//   };

//   // submits data in when clicked on submit
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "https://jsonplaceholder.typicode.com/posts",
//         formData
//       );
//       console.log("formData : ", formData);
//       console.log("server response ", response);
//     } catch (error) {
//       console.log("error - ", error);
//     }
//   };

//   return (
//     <>
//       <div className="logo">
//         <img src={logo} alt="Your Logo" />
//       </div>
//       <div className="container">
//         <form className="mx-auto">
//           {/* =========== category starts ===========  */}
//           <h1 className="heading">Recipe Category</h1>
//           <br />
//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Category Name :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="categoryName"
//                 name="categoryName"
//                 placeholder="Enter Category Name"
//                 onChange={categorySlugHandler}
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Category Slug :
//             </label>
//             <div className="col-sm-10">{formData.categorySlug}</div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Banner Image :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="file"
//                 className="form-control"
//                 id="bannerImage"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({ field: "bannerImage", value: e.target.value })
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Sub Heading :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="subHeading"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({ field: "subHeading", value: e.target.value })
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Description :
//             </label>
//             <div className="col-sm-10">
//               <textarea
//                 className="form-control"
//                 id="description"
//                 rows="6"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({ field: "description", value: e.target.value })
//                   )
//                 }
//               ></textarea>
//             </div>
//           </div>
//           {/* =========== categrory ends =========== */}
//           <br />

//           {/* =========== recipe starts =========== */}
//           <h1 className="heading">Recipe Details</h1>
//           <br />
//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Recipe Name :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="recipeName"
//                 onChange={recipeNameHandler}
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Slug :
//             </label>

//             <div className="col-sm-10">{formData.recipeSlug}</div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Image :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="file"
//                 className="form-control"
//                 id="recipeImage"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({ field: "recipeImage", value: e.target.value })
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Description :
//             </label>
//             <div className="col-sm-10">
//               <textarea
//                 className="form-control"
//                 id="recipeDescription"
//                 rows="6"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({
//                       field: "recipeDescription",
//                       value: e.target.value,
//                     })
//                   )
//                 }
//               ></textarea>
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Cooking Time :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="cookingTime"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({ field: "cookingTime", value: e.target.value })
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <br />

//           <div className="form-group row">
//             <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
//               Additional Note :
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="additionalNote"
//                 onChange={(e) =>
//                   dispatch(
//                     updateField({
//                       field: "additionalNote",
//                       value: e.target.value,
//                     })
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <br />

//           <h1 className="heading">Add Ingredients</h1>
//           <br />

//           <div className="container mt-4">
//             <div className="row">
//               <div className="col">
//                 <label for="quantity" className="sr-only">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="quantity"
//                   placeholder="Quantity"
//                 />
//               </div>
//               <div className="col">
//                 <label for="unit" className="sr-only">
//                   Unit
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="unit"
//                   placeholder="Unit"
//                 />
//               </div>
//               <div className="col">
//                 <label for="name" className="sr-only">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   placeholder="Name"
//                 />
//               </div>
//               <div className="col">
//                 <label for="extraNote" className="sr-only">
//                   Extra Note
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="extraNote"
//                   placeholder="Extra Note"
//                 />
//               </div>
//               <div className="col my-4 ">
//                 <button type="submit" className="btn btn-primary">
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-2 mb-3">
//               <label>&nbsp;</label>
//               <button
//                 type="button"
//                 className="btn btn-primary form-control"
//                 onClick={addField}
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* =========== recipe ends =========== */}

//           <center>
//             <button
//               type="button"
//               className="btn btn-success"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </center>
//         </form>
//       </div>
//     </>
//   );
// }

// export default RecipeDescription;
