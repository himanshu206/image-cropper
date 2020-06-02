import React from "react";
import Image from "../../../common/Image";

import "./ImagePreviews.css";

const ImagePreviews = ({ images, onHide }) => {
  return (
    <div className="overlay">
      <div className="overlay__content">
        {images.map((image) => {
          const {
            type,
            dimensions: { width, height },
            src,
          } = image;
          return (
            <div className="content__image-container">
              <Image src={src}></Image>
              <span className="image-container__info">{`${type} - ${width} x ${height}`}</span>
            </div>
          );
        })}
      </div>
      <span className="overlay__hide-btn" onClick={onHide}>
        Hide
      </span>
    </div>
  );
};

export default ImagePreviews;
