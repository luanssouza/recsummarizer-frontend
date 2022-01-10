import "./Error.css";

import React from "react";
import { Button } from "react-bootstrap";

function Error() {
  return (
    <div className="text-center">
      <h1 className="d-flex justify-content-center error">Error!</h1>
      <p className="d-flex justify-content-center error-span">
        Ops... Something went wrong.
      </p>
      <p className="d-flex justify-content-center error-span">
        Please, try to restart te expirement.
      </p>
      <Button href="/" size="lg">Home</Button>
    </div>
  );
}

export default Error;
