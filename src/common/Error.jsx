import React from "react";
import "./Error.css";

const Error = ({ error }) => {
  return error ? <div className="error">{error}</div> : null;
};

export default Error;
