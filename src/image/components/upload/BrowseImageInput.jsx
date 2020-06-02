import React from "react";
import "./BrowseImageInput.css";

const BrowseImageInput = ({ onSelect }) => {
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    onSelect(file);
  };

  return (
    <div className="browse-image">
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleOnChange}
      ></input>
      <label for="image">Browse Image</label>
    </div>
  );
};

export default BrowseImageInput;
