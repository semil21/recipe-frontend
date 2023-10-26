import React from "react";

function Card() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="breakfast"
            />
            <label className="form-check-label" htmlFor="breakfast">
              Breakfast
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check-inline">
            <input type="checkbox" className="form-check-input" id="lunch" />
            <label className="form-check-label" htmlFor="lunch">
              Lunch
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check-inline">
            <input type="checkbox" className="form-check-input" id="dinner" />
            <label className="form-check-label" htmlFor="dinner">
              Dinner
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
