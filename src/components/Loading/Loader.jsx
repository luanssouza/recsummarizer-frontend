import "./Loader.css";

import React from "react";

const Loader = (props) => {
  return (
    <div className="loader-center" hidden={props.hidden}>
      <div className="spinner">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
