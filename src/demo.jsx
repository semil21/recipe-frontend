import React, { useState } from "react";

function Recipe() {
  const onHandleSubmit = () => {};

  return (
    <>
      <center>
        <h1 className="heading my-3">Recipe Details</h1>
      </center>
      <form className="mx-auto">
        <br />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Recipe Name :</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="recipeName" />
          </div>
        </div>
        <br />

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Slug :</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="slug" />
          </div>
        </div>
        <br />

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Image :</label>
          <div className="col-sm-10">
            <input type="file" className="form-control" id="recipeImage" />
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
            ></textarea>
          </div>
        </div>
        <br />

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Cooking Time :</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="cookingTime" />
          </div>
        </div>
        <br />

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Additional Note :</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="additionalNote" />
          </div>
        </div>
        <br />

        <center>
          <h1 className="heading">Add Ingredients</h1>
        </center>
        <br />
        <div id="ingredients" className="container">
          <div className="container mt-4">
            <div className="row">
              <div className="col">
                <label className="sr-only">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                />
              </div>
              <div className="col">
                <label className="sr-only">Unit</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unit"
                />
              </div>
              <div className="col">
                <label className="sr-only">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="col">
                <label className="sr-only">Extra Note</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Extra Note"
                />
              </div>
            </div>
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
    </>
  );
}

export default Recipe;
