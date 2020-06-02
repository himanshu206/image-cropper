import React from "react";
import Error from "../../../common/Error";
import UploadButton from "../../../common/UploadButton";
import Image from "../../../common/Image";
import Loader from "../../../common/Loader";

import ImageUtils from "../../utils/ImageUtils";
import ImageCropper from "../../utils/ImageCropper";

import BrowseImageInput from "./BrowseImageInput";
import ImagePreviews from "./ImagePreviews";

import "./ImageUploader.css";

class ImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      error: null,
      isPreviewDialogVisible: false,
      croppedImages: [],
    };
  }

  handleImageSelect = (file) => {
    const { uploadResolutions } = this.props;
    if (file) {
      ImageUtils.validateImage(file)
        .then(({ image }) => {
          this.setState({
            image,
            error: null,
            croppedImages: ImageCropper.getCroppedImages(
              image.obj,
              uploadResolutions
            ),
          });
        })
        .catch((error) => {
          this.setState({ image: null, error, croppedImages: [] });
        });
    }
  };

  handleShowPreviewDialog = () => {
    this.setState({ isPreviewDialogVisible: true });
  };

  handleHidePreviewDialog = () => {
    this.setState({ isPreviewDialogVisible: false });
  };

  handleUploadButtonClick = () => {
    const { onUpload } = this.props;
    const { croppedImages } = this.state;

    onUpload(croppedImages);
  };

  render() {
    const { isUploadInProgress } = this.props;
    const { image, croppedImages, error, isPreviewDialogVisible } = this.state;

    return (
      <>
        {!isPreviewDialogVisible ? (
          <div className="image-uploader">
            <div className="image-uploader__view">
              <div className="view__content">
                {image ? <Image src={image.obj.src}></Image> : null}
              </div>
              <div className="view__meta">
                {croppedImages.length ? (
                  <span
                    className="info__preview"
                    onClick={this.handleShowPreviewDialog}
                  >
                    Show Cropped Versions Preview
                  </span>
                ) : null}
                <Error error={error}></Error>
              </div>
            </div>

            {isUploadInProgress ? (
              <Loader></Loader>
            ) : (
              <>
                <BrowseImageInput
                  onSelect={this.handleImageSelect}
                ></BrowseImageInput>
                {image ? (
                  <div className="image-uploader__upload-btn">
                    <UploadButton
                      disabled={isUploadInProgress}
                      onClick={this.handleUploadButtonClick}
                    ></UploadButton>
                  </div>
                ) : null}
              </>
            )}
          </div>
        ) : (
          <ImagePreviews
            images={croppedImages}
            onHide={this.handleHidePreviewDialog}
          ></ImagePreviews>
        )}
      </>
    );
  }
}

export default ImageUploader;
