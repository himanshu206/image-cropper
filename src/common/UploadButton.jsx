import React from "react";
import "./UploadButton.css";

const UploadButton = ({ onClick, disabled }) => {
  return (
    <button className="upload-image-btn" onClick={onClick} disabled={disabled}>
      Upload Image
    </button>
  );
};

export default UploadButton;
